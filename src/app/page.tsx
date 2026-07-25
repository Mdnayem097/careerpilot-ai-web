"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  FileText,
  Compass,
  Bot,
  CheckCircle2,
  ArrowRight,
  Zap,
  BrainCircuit,
  Database,
  TrendingUp,
  Cpu,
  Users,
  ShieldCheck,
  ChevronDown,
  Star,
  Layers,
  BarChart3,
} from "lucide-react";

export default function HomePage() {
  const { demoLogin, user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does the Agentic AI Reasoning Engine work?",
      a: "Unlike standard static LLM prompts, our Agentic Engine uses multi-step tools, state persistence, and memory stores to break down career tasks into actionable reasoning steps.",
    },
    {
      q: "Is my chat history and resume analysis saved persistently?",
      a: "Yes! All chat interactions, ATS scores, and personalized roadmap states are linked to your profile and securely saved in MongoDB Atlas.",
    },
    {
      q: "Can I manage or delete career items I add?",
      a: "Absolutely. Authenticated users can access protected routes (/items/add and /items/manage) to perform full CRUD operations.",
    },
    {
      q: "Does CareerPilot AI support One-Click Demo Access?",
      a: "Yes, you can click 'Launch Demo Account' anywhere on the home page to immediately explore protected features without registering manually.",
    },
  ];

  return (
    <div className="space-y-12 py-2">
      {/* ================= SECTION 1: Compact Hero Banner ================= */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 sm:p-6 md:p-8 shadow-xl backdrop-blur-md">
        {/* Animated Background Glows */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-500/15 rounded-full blur-[90px] animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-300">
              <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" />
              <span>Next-Gen Agentic AI Platform</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Supercharge Engineering Career with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Autonomous Reasoning
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Real-time ATS resume optimization, multi-step career trajectory
              reasoning with persistent MongoDB memory, and AI mentorship.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {!user ? (
                <button
                  onClick={demoLogin}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300 animate-bounce" />
                  <span>Launch Demo Account</span>
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-1.5"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <Link
                href="/career-items"
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-800 hover:border-slate-700 transition-all flex items-center space-x-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>Explore Directory</span>
              </Link>
            </div>

            {/* Micro Tech Badges */}
            <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>MongoDB Memory</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Groq / Gemini AI</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Next.js 15</span>
              </div>
            </div>
          </div>

          {/* Right Column Preview Widget (5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

            <div className="relative rounded-xl border border-slate-800/90 bg-slate-900/90 p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                  <Cpu className="w-3 h-3 text-indigo-400 animate-spin" />
                  <span>Agent Reasoning Engine</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-indigo-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> ATS Match Index
                  </span>
                  <span className="text-emerald-400 font-mono">94%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[94%]" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-800/30 space-y-1">
                <div className="flex items-center space-x-1.5 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                  <BrainCircuit className="w-3 h-3 text-purple-400" /> Live AI
                  Memory
                </div>
                <p className="text-[11px] font-mono text-slate-300 truncate">
                  <span className="text-emerald-400 font-bold">✓</span> Stack
                  analyzed & gap saved to DB
                </p>
              </div>

              <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-[11px] text-slate-300">
                <div className="w-6 h-6 rounded bg-pink-500/10 border border-pink-500/30 flex items-center justify-center flex-shrink-0 text-pink-400">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <p className="truncate">
                  <strong className="text-white">AI Mentor:</strong> Next
                  milestone: Master Docker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: Platform Stats Bar ================= */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-card border border-border/80 text-center space-y-1">
          <div className="text-xl font-bold text-white flex items-center justify-center space-x-1">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>2,500+</span>
          </div>
          <p className="text-xs text-slate-400">Active Engineers</p>
        </div>
        <div className="p-4 rounded-xl glass-card border border-border/80 text-center space-y-1">
          <div className="text-xl font-bold text-white flex items-center justify-center space-x-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>98.2%</span>
          </div>
          <p className="text-xs text-slate-400">ATS Optimization Match</p>
        </div>
        <div className="p-4 rounded-xl glass-card border border-border/80 text-center space-y-1">
          <div className="text-xl font-bold text-white flex items-center justify-center space-x-1">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            <span>15,000+</span>
          </div>
          <p className="text-xs text-slate-400">Reasoning Chains Run</p>
        </div>
        <div className="p-4 rounded-xl glass-card border border-border/80 text-center space-y-1">
          <div className="text-xl font-bold text-white flex items-center justify-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>100%</span>
          </div>
          <p className="text-xs text-slate-400">Persistent MongoDB Sync</p>
        </div>
      </section>

      {/* ================= SECTION 3: Agentic AI Core Features (4 Cards Row Layout) ================= */}
      <section className="space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Engineered with Agentic AI Capabilities
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Autonomous tools, reasoning chains, and persistent context stores
            for modern engineers.
          </p>
        </div>

        {/* 4 Cards Row/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-xl glass-card border border-border/80 hover:border-indigo-500/50 transition-all space-y-3 group hover:-translate-y-1">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              ATS Resume Analyzer
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Extracts tech keywords, measures ATS alignment, and rewrite
              suggestions.
            </p>
            <Link
              href="/ai/resume-analyzer"
              className="inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 space-x-1 pt-1"
            >
              <span>Try Analyzer</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl glass-card border border-border/80 hover:border-purple-500/50 transition-all space-y-3 group hover:-translate-y-1">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              Career Path Engine
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Multi-step reasoning engine with MongoDB memory persistence.
            </p>
            <Link
              href="/ai/career-recommender"
              className="inline-flex items-center text-xs font-semibold text-purple-400 hover:text-purple-300 space-x-1 pt-1"
            >
              <span>Build Roadmap</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl glass-card border border-border/80 hover:border-pink-500/50 transition-all space-y-3 group hover:-translate-y-1">
            <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              AI Chat Assistant
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Continuous conversational mentor that remembers past sessions in
              MongoDB.
            </p>
            <Link
              href="/ai/chat"
              className="inline-flex items-center text-xs font-semibold text-pink-400 hover:text-pink-300 space-x-1 pt-1"
            >
              <span>Open Mentor</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-xl glass-card border border-border/80 hover:border-emerald-500/50 transition-all space-y-3 group hover:-translate-y-1">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              Readiness Analytics
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Interactive score breakdown, skill gap lists, and market salary
              forecasts.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-xs font-semibold text-emerald-400 hover:text-emerald-300 space-x-1 pt-1"
            >
              <span>View Metrics</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: How It Works Process ================= */}
      <section className="p-6 rounded-2xl glass-card border border-border/80 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white">
            How CareerPilot AI Works
          </h2>
          <p className="text-slate-400 text-xs">
            Autonomous 3-step workflow designed for rapid career advancement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm flex items-center justify-center mx-auto">
              1
            </div>
            <h4 className="text-sm font-semibold text-white">
              Upload & Analyze
            </h4>
            <p className="text-xs text-slate-400">
              Submit your current resume or target job role description.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm flex items-center justify-center mx-auto">
              2
            </div>
            <h4 className="text-sm font-semibold text-white">
              Agentic Reasoning
            </h4>
            <p className="text-xs text-slate-400">
              AI chains tools to identify gaps and compute ATS matching scores.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 font-bold text-sm flex items-center justify-center mx-auto">
              3
            </div>
            <h4 className="text-sm font-semibold text-white">
              Persistent Growth
            </h4>
            <p className="text-xs text-slate-400">
              Roadmap and progress are saved in MongoDB for continuous chat
              mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: CRUD Showcase Section ================= */}
      <section className="p-6 sm:p-8 rounded-2xl glass-card border border-border/80 bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-left">
          <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/30 inline-block">
            REST API & MongoDB Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Full-Stack Directory with Protected Editing
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Browse, filter, add, and manage career opportunities, tech pathways,
            and mentorship resources seamlessly.
          </p>
          <div className="flex items-center space-x-3 pt-1">
            <Link
              href="/career-items"
              className="px-4 py-2 rounded-lg bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Browse Directory
            </Link>
            <Link
              href="/career-items/add"
              className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
            >
              Add New Item
            </Link>
          </div>
        </div>

        <div className="w-full md:w-auto p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs text-slate-300 shadow-lg">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold border-b border-slate-800 pb-2">
            <Database className="w-4 h-4" />
            <span>MongoDB Schema Overview</span>
          </div>
          <div className="pl-1 space-y-1 text-slate-400 text-[11px]">
            <p>
              • <span className="text-slate-200 font-semibold">Users</span>{" "}
              (Auth, JWT, Social, Demo)
            </p>
            <p>
              •{" "}
              <span className="text-slate-200 font-semibold">CareerItems</span>{" "}
              (CRUD Directory Items)
            </p>
            <p>
              • <span className="text-slate-200 font-semibold">Resumes</span>{" "}
              (ATS Analyses & Scores)
            </p>
            <p>
              •{" "}
              <span className="text-slate-200 font-semibold">
                CareerRoadmaps
              </span>{" "}
              (Memory Reasoning)
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: Testimonials / Community Proof ================= */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Loved by Software Engineers
          </h2>
          <p className="text-slate-400 text-xs">
            See how autonomous AI reasoning transforms career growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl glass-card border border-border/80 space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "The ATS Resume Analyzer gave me specific bullet point edits that
              helped me land 3 interviews in a week!"
            </p>
            <div className="text-xs font-semibold text-white">
              — Tanvir A., Frontend Engineer
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-border/80 space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Unlike ChatGPT, CareerPilot remembers my previous MongoDB stack
              questions and builds continuous roadmaps."
            </p>
            <div className="text-xs font-semibold text-white">
              — Rahat K., MERN Developer
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-border/80 space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "The Demo Login feature made evaluating this project extremely
              fast and seamless during code reviews."
            </p>
            <div className="text-xs font-semibold text-white">
              — Sarah M., Tech Lead
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: FAQ Accordion Section ================= */}
      <section className="p-6 rounded-2xl glass-card border border-border/80 space-y-4 max-w-4xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs">
            Everything you need to know about CareerPilot AI
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-slate-950/60 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${openFaq === index ? "rotate-180 text-indigo-400" : "text-slate-400"}`}
                />
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 mt-1">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
