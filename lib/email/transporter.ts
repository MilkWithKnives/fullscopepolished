// lib/email/transporter.ts
import nodemailer from "nodemailer";

export function resolveSmtpConfig() {
  const host = process.env.EMAIL_SERVER_HOST;
  const port = process.env.EMAIL_SERVER_PORT;
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;

  if (host && port && user && pass) {
    const portNumber = Number(port);
    return {
      host,
      port: portNumber,
      secure: portNumber === 465,
      auth: { user, pass },
    };
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    const gmailPort = Number(process.env.GMAIL_SMTP_PORT || 465);
    return {
      host: "smtp.gmail.com",
      port: gmailPort,
      secure: gmailPort === 465,
      auth: { user: gmailUser, pass: gmailPass },
    };
  }

  throw new Error(
    "Missing email configuration. Provide EMAIL_SERVER_* or GMAIL_USER/GMAIL_APP_PASSWORD in env."
  );
}

let cachedTransporter: nodemailer.Transporter | null = null;

export function getMailer() {
  if (!cachedTransporter) {
    const smtp = resolveSmtpConfig();
    cachedTransporter = nodemailer.createTransport({
      ...smtp,
      tls: { ciphers: "TLSv1.2" },
    });
  }
  return cachedTransporter;
}

// small sanity check function you can call if needed
export async function verifyMailer() {
  await getMailer().verify();
  return true;
}
