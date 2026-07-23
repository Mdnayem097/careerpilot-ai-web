import React from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold text-white">CareerPilot.AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Autonomous Agentic AI platform empowering engineers and technical professionals with real-time ATS scoring, multi-step career trajectory reasoning, and continuous chat mentorship.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Agentic AI Tools</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/ai/resume-analyzer" className="hover:text-primary-light transition-colors">AI Resume Analyzer & ATS</Link></li>
            <li><Link href="/ai/career-recommender" className="hover:text-primary-light transition-colors">AI Career Path Generator</Link></li>
            <li><Link href="/ai/chat" className="hover:text-primary-light transition-colors">AI Chat Assistant</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary-light transition-colors">Analytics Dashboard</Link></li>
          </ul>
        </div>

        {/* Directory Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Career Ecosystem</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/career-items?category=Job+Listing" className="hover:text-primary-light transition-colors">Curated AI Jobs</Link></li>
            <li><Link href="/career-items?category=Skill+Pathway" className="hover:text-primary-light transition-colors">Skill Pathways</Link></li>
            <li><Link href="/career-items?category=Learning+Resource" className="hover:text-primary-light transition-colors">Learning Resources</Link></li>
            <li><Link href="/career-items/add" className="hover:text-primary-light transition-colors">Post an Opportunity</Link></li>
          </ul>
        </div>

        {/* Stack Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Tech Stack Standard</h4>
          <p className="text-xs text-slate-400">
            Next.js 15 App Router • TypeScript • Express.js REST API • MongoDB Atlas • Better Auth / JWT.
          </p>
          <div className="flex space-x-3 pt-2 text-slate-400">
            <a href="#" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-border/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 CareerPilot AI Inc. Built for Programming Hero Agentic AI Certification.</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>using TypeScript & Multi-Agent AI</span>
        </p>
      </div>
    </footer>
  );
}
