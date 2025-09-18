import { NextResponse } from "next/server";
import { verifyMailer } from "lib/email/transporter";

export async function GET() {
  try {
    await verifyMailer();
    return NextResponse.json({
      ok: true,
      transport: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT || 0),
        secure: false,
        user: process.env.EMAIL_SERVER_USER,
      },
    });
  } catch (err: any) {
    const isProd = process.env.NODE_ENV === "production";
    const payload: any = { ok: false, error: err?.message || "Verification failed" };
    // Include extra diagnostics only in non-production to avoid leaking details
    if (!isProd) {
      if (err?.code) payload.code = err.code;
      if (err?.response) payload.response = err.response;
      if (err?.command) payload.command = err.command;
    }
    return NextResponse.json(payload, { status: 500 });
  }
}

