// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ---- 1) Basic payload validation (no external deps) ----
function bad(msg: string, status = 400) {
  return NextResponse.json({ success: false, error: msg }, { status });
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// ---- 2) Optional tiny rate limiter (per-IP, in-memory) ----
// (Good enough for a single server; disable if you don't want it.)
const HITS = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 8;

function rateLimit(ip: string | null) {
  if (!ip) return false;
  const now = Date.now();
  const rec = HITS.get(ip);
  if (!rec || now - rec.t > WINDOW_MS) {
    HITS.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n++;
  if (rec.n > MAX_PER_WINDOW) return true;
  return false;
}

// ---- 3) Build a transporter from env ----
function makeTransporter() {
  const {
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
  } = process.env;

  if (
    !EMAIL_SERVER_HOST ||
    !EMAIL_SERVER_PORT ||
    !EMAIL_SERVER_USER ||
    !EMAIL_SERVER_PASSWORD
  ) {
    throw new Error(
      "Email server env vars missing. Expected EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD."
    );
  }

  return nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: parseInt(EMAIL_SERVER_PORT, 10),
    secure: false, // Office365/most SMTP use STARTTLS on 587
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
    tls: {
      // Helps with some Office365/hosted providers behind proxies
      ciphers: "TLSv1.2",
      rejectUnauthorized: true,
    },
  });
}

// ---- 3b) Microsoft Graph (OAuth2 client credentials) mail sender ----
function hasGraphCreds() {
  const { OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET, OUTLOOK_TENANT_ID, OUTLOOK_SENDER } =
    process.env as Record<string, string | undefined>;
  return Boolean(OUTLOOK_CLIENT_ID && OUTLOOK_CLIENT_SECRET && OUTLOOK_TENANT_ID && OUTLOOK_SENDER);
}

async function getGraphToken() {
  const tenant = process.env.OUTLOOK_TENANT_ID!;
  const client_id = process.env.OUTLOOK_CLIENT_ID!;
  const client_secret = process.env.OUTLOOK_CLIENT_SECRET!;
  const tokenUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id,
    client_secret,
    scope: "https://graph.microsoft.com/.default",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Graph token error: ${res.status} ${res.statusText} ${text}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Graph token missing access_token");
  return json.access_token;
}

async function sendViaGraph(opts: {
  to: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const accessToken = await getGraphToken();
  const sender = process.env.OUTLOOK_SENDER!; // user principal name (email)
  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`;

  const message = {
    message: {
      subject: opts.subject,
      body: {
        contentType: opts.html ? "HTML" : "Text",
        content: opts.html || opts.text || "",
      },
      toRecipients: [
        {
          emailAddress: { address: opts.to },
        },
      ],
      replyTo: opts.replyTo
        ? [
            {
              emailAddress: { address: opts.replyTo },
            },
          ]
        : [],
    },
    saveToSentItems: true,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Graph send error: ${res.status} ${res.statusText} ${text}`);
  }
}

// ---- 4) POST handler ----
export async function POST(req: Request) {
  try {
    // Rate-limit
    const ip =
      // cf-connecting-ip when behind Cloudflare
      (req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        null)?.split(",")[0].trim() || null;

    if (rateLimit(ip)) return bad("Too many requests. Try again in a minute.", 429);

    // Parse + validate body
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || name.length < 2) return bad("Please provide your name.");
    if (!email || !isEmail(email)) return bad("Please provide a valid email.");
    if (!message || message.length < 10) return bad("Message is too short.");

    // Optional honeypot (if you add a hidden input named "company")
    const company = String(body.company || "").trim();
    if (company) return bad("Spam detected.", 400);

    const SITE_NAME = process.env.SITE_NAME || "Full Scope Media";
    const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER!;
    const TO = process.env.EMAIL_SERVER_USER || process.env.OUTLOOK_SENDER!; // send to yourself

    const subject = `New inquiry from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nIP: ${ip ?? "unknown"}\n\nMessage:\n${message}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.6;">
        <h2 style="margin:0 0 8px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>IP:</strong> ${escapeHtml(ip ?? "unknown")}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0;">
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    if (hasGraphCreds()) {
      await sendViaGraph({ to: TO!, replyTo: email, subject, text, html });
    } else {
      // Fallback to SMTP if Graph creds are not configured
      const transporter = makeTransporter();
      await transporter.sendMail({
        from: `"${SITE_NAME} Forms" <${EMAIL_FROM}>`,
        to: TO!,
        replyTo: email,
        subject,
        text,
        html,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    const isProd = process.env.NODE_ENV === "production";
    const msg = err?.message || "Failed to send message.";
    // Log full details server-side for debugging
    console.error("[contact] error:", msg, {
      code: err?.code,
      response: err?.response,
      command: err?.command,
    });
    // In dev, surface the actual error message to the client for faster debugging
    return NextResponse.json(
      { success: false, error: isProd ? "Failed to send message." : msg },
      { status: 500 }
    );
  }
}

// ---- 5) Helpers ----
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// (Optional) handle OPTIONS for CORS preflight if you ever post from another origin
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
