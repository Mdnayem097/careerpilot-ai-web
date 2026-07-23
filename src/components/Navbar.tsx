'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Compass,
  FileText,
  Bot,
  LayoutDashboard,
  PlusCircle,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Briefcase,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore Career', href: '/career-items', icon: Compass },
    { label: 'AI Resume Analyzer', href: '/ai/resume-analyzer', icon: FileText, protected: true },
    { label: 'AI Career Path', href: '/ai/career-recommender', icon: Sparkles, protected: true },
    { label: 'AI Chat Mentor', href: '/ai/chat', icon: Bot, protected: true },
    { label: 'Analytics', href: '/dashboard', icon: LayoutDashboard, protected: true },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-200">
                CareerPilot<span className="text-primary font-black">.AI</span>
              </span>
              <span className="block text-[10px] text-indigo-400 font-mono tracking-wider uppercase -mt-1">
                Agentic Career Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    isActive
                      ? 'bg-primary/15 text-primary-light border border-primary/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary-light' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Auth Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/career-items/add"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center space-x-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post Item</span>
                </Link>

                <Link
                  href="/career-items/manage"
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                  title="Manage Items"
                >
                  <Settings className="w-4 h-4" />
                </Link>

                <div className="flex items-center space-x-2 pl-2 border-l border-border">
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full ring-2 ring-primary/40 object-cover"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">{user.headline || user.role}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={demoLogin}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 hover:from-amber-500/30 hover:to-orange-500/30 transition-all"
                >
                  ⚡ Instant Demo Login
                </button>
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm flex items-center space-x-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            if (link.protected && !user) return null;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
              >
                <Icon className="w-5 h-5 text-primary-light" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          {!user && (
            <div className="pt-4 space-y-2">
              <button
                onClick={() => { demoLogin(); setMobileMenuOpen(false); }}
                className="w-full py-2 bg-amber-500/20 text-amber-300 rounded-lg font-semibold text-xs border border-amber-500/30"
              >
                ⚡ Instant Demo Login
              </button>
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 bg-slate-800 text-slate-200 rounded-lg text-sm"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
