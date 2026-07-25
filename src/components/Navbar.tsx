"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
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
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore Career", href: "/career-items", icon: Compass },
    {
      label: "AI Resume Analyzer",
      href: "/ai/resume-analyzer",
      icon: FileText,
      protected: true,
    },
    {
      label: "AI Career Path",
      href: "/ai/career-recommender",
      icon: Sparkles,
      protected: true,
    },
    { label: "AI Chat Mentor", href: "/ai/chat", icon: Bot, protected: true },
    {
      label: "Analytics",
      href: "/dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 mr-6 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
                CareerPilot
                <span className="text-indigo-400 font-black">.AI</span>
              </span>
              <span className="block text-[10px] text-indigo-400/90 font-mono tracking-widest uppercase -mt-1 font-semibold">
                Agentic Career Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60 shadow-inner">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? "text-white bg-indigo-600/90 shadow-sm shadow-indigo-500/20 border border-indigo-400/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Auth Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center ml-6 space-x-2.5">
                <Link
                  href="/career-items/add"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center space-x-1.5 shadow-sm shadow-emerald-500/5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post Item</span>
                </Link>

                <Link
                  href="/career-items/manage"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all"
                  title="Manage Items"
                >
                  <Settings className="w-4 h-4" />
                </Link>

                <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
                  <div className="flex items-center space-x-2.5 group cursor-pointer">
                    <img
                      src={
                        user.avatarUrl ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                      }
                      alt={user.name}
                      className="w-8 h-8 rounded-full ring-2 ring-indigo-500/40 group-hover:ring-indigo-400 transition-all object-cover"
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-slate-100 leading-tight">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono truncate max-w-[110px]">
                        {user.headline || user.role}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-all rounded-xl hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20"
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
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all shadow-sm shadow-amber-500/5 flex items-center space-x-1 cursor-pointer"
                >
                  <span>⚡ Instant Demo</span>
                </button>

                <Link
                  href="/auth/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all flex items-center space-x-1.5 border border-transparent hover:border-slate-700/60"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  <span>Log In</span>
                </Link>

                <Link
                  href="/auth/register"
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all flex items-center space-x-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`}
                    />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </Link>
              );
            })}
          </div>

          {/* Mobile User Profile or Auth */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        user.avatarUrl ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                      }
                      alt={user.name}
                      className="w-9 h-9 rounded-full ring-2 ring-indigo-500/40 object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {user.headline || user.role}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/career-items/add"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Post Item</span>
                  </Link>
                  <Link
                    href="/career-items/manage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Manage</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    demoLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 rounded-xl font-bold text-xs border border-amber-500/30 shadow-sm"
                >
                  ⚡ Instant Demo Login
                </button>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 bg-slate-900 text-slate-200 rounded-xl text-xs font-semibold border border-slate-800"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
