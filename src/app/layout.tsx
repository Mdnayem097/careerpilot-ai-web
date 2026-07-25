import type { Metadata } from "next";
import "./globals.css";

import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "CareerPilot.AI — Full-Stack Agentic AI Career Navigation Platform",
  description:
    "Enterprise Agentic AI platform powered by Next.js, TypeScript, Express.js REST API, and MongoDB Atlas. Featuring AI Resume ATS Analyzer and AI Career Recommendation Engines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 antialiased flex flex-col min-h-screen">
        <Providers>
          <Navbar />

          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
