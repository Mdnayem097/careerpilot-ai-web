'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../lib/api';
import { DashboardAnalytics } from '../../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { LayoutDashboard, Award, Target, FileText, CheckCircle2, TrendingUp, Layers } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetchApi<DashboardAnalytics>('/analytics/dashboard');
        setData(res);
      } catch (err) {
        console.error('Error loading analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadAnalytics();
    }
  }, [user]);

  if (loading || !data) {
    return (
      <div className="max-w-6xl mx-auto py-12 space-y-6">
        <div className="h-64 rounded-3xl glass-card animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 rounded-3xl glass-card animate-pulse" />
          <div className="h-80 rounded-3xl glass-card animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-8">
      
      {/* Dashboard Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
            <LayoutDashboard className="w-8 h-8 text-primary-light" />
            <span>Career Analytics Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Real-time performance metrics powered by Recharts & MongoDB telemetry</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Agentic Systems Active</span>
          </span>
        </div>
      </div>

      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-card border border-border space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Readiness Score</span>
          <div className="text-3xl font-extrabold text-white flex items-baseline space-x-1">
            <span>{data.summary.careerReadinessScore}</span>
            <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <p className="text-[11px] text-indigo-400">Target: {data.summary.targetRole}</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-border space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Latest ATS Score</span>
          <div className="text-3xl font-extrabold text-emerald-400 flex items-baseline space-x-1">
            <span>{data.summary.atsScore}%</span>
          </div>
          <p className="text-[11px] text-slate-400">Keywords extracted: {data.summary.skillsMasteredCount}</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-border space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Community Listings</span>
          <div className="text-3xl font-extrabold text-white">
            {data.summary.totalItems}
          </div>
          <p className="text-[11px] text-slate-400">User posted items: {data.summary.userCreatedItems}</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-border space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Skills Mastered</span>
          <div className="text-3xl font-extrabold text-purple-400">
            {data.summary.skillsMasteredCount}
          </div>
          <p className="text-[11px] text-purple-300">Verified in Resume ATS</p>
        </div>

      </div>

      {/* Recharts Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Line Chart - ATS & Keyword Progression */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-primary-light" />
              <span>ATS Score Optimization Trend</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Historical Scans</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.atsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="atsScore" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1' }} name="ATS Score" />
                <Line type="monotone" dataKey="keywordsMatch" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" name="Keyword %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Radar Chart - Skill Gap Analysis */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Skills Competency Radar</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Current vs Target</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data.skillRadar}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={9} />
                <Radar name="Current Proficiency" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                <Radar name="Target Expectation" dataKey="target" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Bar Chart - Application Pipeline Conversion */}
        <div className="lg:col-span-12 p-6 rounded-2xl glass-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan" />
              <span>Job Application Funnel & Conversion Stats</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Active Pipeline</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.pipelineFunnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {data.pipelineFunnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
