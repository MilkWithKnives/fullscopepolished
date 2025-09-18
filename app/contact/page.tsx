"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  date: z.string().optional(),
  message: z.string().min(10, "Message is too short"),
  company: z.string().max(0).optional(), // honeypot, must be empty
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(FormSchema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        // Try to surface server-provided error messages for clarity
        const data = await res.json().catch(() => null as any);
        const msg = data?.error || "Failed to send message.";
        throw new Error(msg);
      }
      setStatus("ok");
      reset();
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(e?.message || "Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-coffee-900 text-mascarpone">
      <section className="container px-4 py-12 sm:py-16">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-center uppercase md:text-left sm:text-4xl">
          Contact
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 md:grid-cols-2"
        >
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm tracking-wide uppercase text-white/80">
                Name
              </span>
              <input
                {...register("name")}
                className="px-3 py-2 text-base border rounded-md outline-none bg-coffee-800 border-white/15 focus:border-wine"
                placeholder="Your name"
              />
              {errors.name && (
                <span className="text-sm text-wine">{errors.name.message}</span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm tracking-wide uppercase text-white/80">
                Email
              </span>
              <input
                {...register("email")}
                type="email"
                className="px-3 py-2 text-base border rounded-md outline-none bg-coffee-800 border-white/15 focus:border-wine"
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="text-sm text-wine">{errors.email.message}</span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm tracking-wide uppercase text-white/80">
                Phone
              </span>
              <input
                {...register("phone")}
                className="px-3 py-2 text-base border rounded-md outline-none bg-coffee-800 border-white/15 focus:border-wine"
                placeholder="(555) 555-5555"
              />
            </label>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm tracking-wide uppercase text-white/80">
                Service
              </span>
              <select
                {...register("service")}
                className="px-3 py-2 text-base border rounded-md outline-none bg-coffee-800 border-white/15 focus:border-wine"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option>Photography</option>
                <option>Videography</option>
                <option>Aerial / Drone</option>
                <option>3D Tours</option>
                <option>Virtual Staging</option>
                <option>Floor Plans</option>
                <option>AI Video Walkthrough</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm tracking-wide uppercase text-white/80">
                Budget
              </span>
              <input
                {...register("budget")}
                className="px-3 py-2 text-base border rounded-md outline-none bg-coffee-800 border-white/15 focus:border-wine"
                placeholder="$500–$2,000"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm tracking-wide uppercase text-white/80">
                Preferred Date
              </span>
              <input
                {...register("date")}
                type="date"
                className="px-3 py-2 text-base border rounded-md outline-none bg-coffee-800 border-white/15 focus:border-wine"
              />
            </label>
          </div>

          <div className="grid gap-4 md:col-span-2">
            <label className="grid gap-2">
              <span className="text-sm tracking-wide uppercase text-white/80">
                Message
              </span>
              <textarea
                {...register("message")}
                rows={5}
                className="px-3 py-2 text-base border rounded-md outline-none bg-coffee-800 border-white/15 focus:border-wine"
                placeholder="Tell me about the property, address, square footage, timeline, and what you need."
              />
              {errors.message && (
                <span className="text-sm text-wine">{errors.message.message}</span>
              )}
            </label>

            {/* Honeypot — keep hidden */}
            <input
              {...register("company")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative flex h-10 w-36 items-center justify-center overflow-hidden rounded-md border border-mascarpone/20 bg-coffee-800 text-[12px] font-extrabold uppercase tracking-wide text-mascarpone duration-500 hover:border-wine disabled:opacity-60"
              >
                <span className="absolute z-0 w-24 h-24 transition-transform duration-500 rounded-full bg-coffee-900 group-hover:scale-150" />
                <span className="absolute z-0 w-16 h-16 transition-all duration-500 rounded-full bg-coffee-700" />
                <span className="absolute z-0 w-12 h-12 transition-all duration-500 rounded-full bg-wine" />
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
              </button>

              {status === "ok" && (
                <span className="text-sm text-emerald-400">
                  Sent! I’ll get back to you shortly.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-wine">{errorMsg}</span>
              )}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
