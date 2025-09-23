import { z } from "zod";

const schema = z.object({
  GMAIL_USER: z.string().email(),
  GMAIL_APP_PASSWORD: z.string().min(16),
  CONTACT_TO: z.string().email(),
  CONTACT_FROM_NAME: z.string().min(2),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export const env = (() => {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Invalid env:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
})();