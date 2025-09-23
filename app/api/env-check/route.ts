// app/api/env-check/route.ts
import { NextResponse } from 'next/server';

// Returns presence (true/false) of required env keys without exposing values
export async function GET() {
  const has = (k: string) => Boolean(process.env[k]);

  const env = Object.fromEntries(
    (
      [
        // Public runtime
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'NEXT_PUBLIC_SITE_URL',

        // Email/SMTP
        'EMAIL_SERVER_HOST',
        'EMAIL_SERVER_PORT',
        'EMAIL_SERVER_USER',
        'EMAIL_SERVER_PASSWORD',
        'GMAIL_USER',
        'GMAIL_APP_PASSWORD',
        'CONTACT_TO',
        'CONTACT_FROM_NAME',
        'EMAIL_FROM',
        'SITE_NAME',

        // Misc
        'NODE_ENV',
      ] as const
    ).map((k) => [k, has(k)])
  );

  return NextResponse.json({ ok: true, env });
}
