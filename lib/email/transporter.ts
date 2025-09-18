// lib/email/transporter.ts
import nodemailer from "nodemailer";

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

const host = required("EMAIL_SERVER_HOST", process.env.EMAIL_SERVER_HOST);
const port = Number(required("EMAIL_SERVER_PORT", process.env.EMAIL_SERVER_PORT));
const user = required("EMAIL_SERVER_USER", process.env.EMAIL_SERVER_USER);
const pass = required("EMAIL_SERVER_PASSWORD", process.env.EMAIL_SERVER_PASSWORD);

export const mailer = nodemailer.createTransport({
  host,
  port,
  secure: false, // STARTTLS on 587
  auth: { user, pass },
  tls: { ciphers: "TLSv1.2" },
});

// small sanity check function you can call if needed
export async function verifyMailer() {
  await mailer.verify();
  return true;
}