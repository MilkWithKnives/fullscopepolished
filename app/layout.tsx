// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
// Modern fonts
import { Montserrat, Raleway } from "next/font/google";

// 🔹 Layout components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 🔹 Structured data for SEO
import { businessStructuredData } from "@/lib/structured-data";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full Scope Media",
  description:
    "Real-estate media: photo, video, drone, floor plans, 3D tours, virtual staging.",
  metadataBase: new URL("https://fullscope-media.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${raleway.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessStructuredData),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen font-sans antialiased bg-coffee-900 text-mascarpone">
        {/* ✅ NAVBAR */}
        <Header />
        {/* ✅ MAIN CONTENT */}
        <main className="flex-grow">{children}</main>
        {/* ✅ FOOTER */}
        <Footer />
        <SpeedInsights /> {/* 👈 add this near the end of <body> */}
        <Analytics />
      </body>
    </html>
  );
}
