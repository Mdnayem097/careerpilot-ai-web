'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  FileText,
  Compass,
  Bot,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  BrainCircuit,
  Layers,
  Search,
  Database
} from 'lucide-react';

export default function HomePage() {
  const { demoLogin, user } = useAuth();

  return (
    <div className="space-y-24 py-6">
      
      {/* Hero Section */}
      <section className="relative text-center py-16 px-4 overflow-hidden rounded-3xl glass-card border border-border">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary-light mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Programming Hero Agentic AI Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Supercharge Your Engineering Career with{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Autonomous Agentic AI
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Real-time ATS resume optimization, multi-step career trajectory reasoning with MongoDB memory, and persistent AI chat mentorship.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {!user ? (
            <button
              onClick={demoLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-base shadow-lg shadow-primary/25 hover:opacity-95 transition-all glow-button flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Launch Demo Account Instantly</span>
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all flex items-center justify-center space-x-2"
            >
              <span>Go to Analytics Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}

          <Link
            href="/career-items"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-slate-200 font-semibold text-base hover:bg-slate-800 transition-all border border-border flex items-center justify-center space-x-2"
          >
            <Compass className="w-5 h-5 text-indigo-400" />
            <span>Explore Career Directory</span>
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 pt-8 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-slate-400 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Next.js 15 App Router</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>TypeScript Mandatory</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Express.js REST API</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>MongoDB Atlas Schemas</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Engineered with True Agentic AI Capabilities</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Beyond simple prompts — CareerPilot AI deploys specialized autonomous tools, reasoning chains, and persistent context stores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-2xl glass-card border border-border hover:border-primary/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Agentic AI Resume Analyzer</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Extracts tech keywords, measures ATS alignment, calculates keyword density scores, and generates precise bullet-point rewriters.
            </p>
            <Link href="/ai/resume-analyzer" className="inline-flex items-center text-xs font-semibold text-primary-light hover:underline space-x-1 pt-2">
              <span>Try Resume Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl glass-card border border-border hover:border-secondary/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Career Path Recommender</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Multi-step reasoning engine with MongoDB memory persistence. Evaluates your current stack vs target role to build phased milestone roadmaps.
            </p>
            <Link href="/ai/career-recommender" className="inline-flex items-center text-xs font-semibold text-purple-400 hover:underline space-x-1 pt-2">
              <span>Generate Career Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl glass-card border border-border hover:border-cyan/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Chat Assistant with History</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Continuous conversational mentor that remembers past sessions in MongoDB, providing contextual answers on negotiation, interviews, and skills.
            </p>
            <Link href="/ai/chat" className="inline-flex items-center text-xs font-semibold text-cyan hover:underline space-x-1 pt-2">
              <span>Open Chat Mentor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* CRUD Showcase Section */}
      <section className="p-10 rounded-3xl glass-card border border-border bg-card/60 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30 inline-block">
            REST API & MongoDB CRUD Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Full-Stack Career Directory with Filter & Protected Editing
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Manage your opportunities, skill pathways, courses, and mentorships. Features Listing Page, Details Page, Add Item Page, and Manage Item Page.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <Link
              href="/career-items"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition-colors"
            >
              Browse Listing Page
            </Link>
            <Link
              href="/career-items/add"
              className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
            >
              Add New Item
            </Link>
          </div>
        </div>

        <div className="w-full md:w-auto p-6 rounded-2xl bg-slate-900/80 border border-border space-y-3 font-mono text-xs text-slate-300">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold">
            <Database className="w-4 h-4" />
            <span>MongoDB Schema Overview</span>
          </div>
          <div className="pl-4 space-y-1 text-slate-400 border-l border-slate-800">
            <p>• <span className="text-slate-200">Users</span> (Auth, JWT, Google, Demo)</p>
            <p>• <span className="text-slate-200">CareerItems</span> (CRUD Directory Items)</p>
            <p>• <span className="text-slate-200">Resumes</span> (ATS Analyses & Scores)</p>
            <p>• <span className="text-slate-200">CareerRoadmaps</span> (Memory Reasoning)</p>
            <p>• <span className="text-slate-200">ChatConversations</span> (Stored Messages)</p>
          </div>
        </div>
      </section>

    </div>
  );
}
