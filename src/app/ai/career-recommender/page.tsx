'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchApi } from '../../../lib/api';
import { CareerRoadmap } from '../../../types';
import { Sparkles, BrainCircuit, RefreshCw, CheckCircle2, History, ArrowRight, Layers, Target } from 'lucide-react';

export default function CareerRecommenderPage() {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState('Full Stack Developer');
  const [targetRole, setTargetRole] = useState('Senior AI Systems Engineer');
  const [pacing, setPacing] = useState('Standard (6 months)');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetchApi<{ roadmap: CareerRoadmap }>('/ai/career-recommendation', {
        method: 'POST',
        body: JSON.stringify({ currentRole, targetRole, pacing })
      });
      setRoadmap(res.roadmap);
    } catch (err: any) {
      setError(err.message || 'Failed to generate career recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-xs font-semibold text-purple-300">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Multi-Step Reasoning & Persistent Memory Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Agentic AI Career Recommendation Engine</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Analyzes historical memory, evaluates market trajectory gaps, and synthesizes step-by-step milestone roadmaps saved in MongoDB.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Role Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-border space-y-4">
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Current Role Profile</label>
                <input
                  type="text"
                  required
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="e.g. Mid-Level Frontend Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Target Role Destination</label>
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior AI Systems Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Preferred Transition Pacing</label>
                <select
                  value={pacing}
                  onChange={(e) => setPacing(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-xs focus:outline-none focus:border-secondary"
                >
                  <option value="Accelerated (3 months)">Accelerated (3 months)</option>
                  <option value="Standard (6 months)">Standard (6 months)</option>
                  <option value="Comprehensive (12 months)">Comprehensive (12 months)</option>
                </select>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-secondary via-accent to-primary text-white font-bold text-xs shadow-lg shadow-secondary/20 hover:opacity-95 transition-all flex items-center justify-center space-x-2 glow-button"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Querying Memory & Reasoning...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-4 h-4" />
                    <span>Synthesize Agentic Career Roadmap</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

        {/* Right Column: Reasoning & Roadmap Display */}
        <div className="lg:col-span-7 space-y-6">
          {roadmap ? (
            <div className="space-y-6">
              
              {/* Score Header */}
              <div className="p-6 rounded-2xl glass-card border border-secondary/30 bg-secondary/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Career Readiness Score</span>
                  <div className="text-4xl font-black text-white mt-1">
                    {roadmap.readinessScore}%
                  </div>
                  <p className="text-xs text-purple-300 font-medium mt-1">
                    Target: {roadmap.currentRole} ➔ {roadmap.targetRole}
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-900 border border-border text-xs font-mono text-slate-300">
                  Pacing: {roadmap.memoryContext?.preferredPacing || pacing}
                </div>
              </div>

              {/* Agent Thought Reasoning Chain Log */}
              <div className="p-5 rounded-2xl glass-card border border-border space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                  <History className="w-4 h-4 text-purple-400" />
                  <span>Agent Multi-Step Reasoning Trace</span>
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-border font-mono text-[11px] text-slate-400 space-y-1.5">
                  {roadmap.reasoningChain.map((step, i) => (
                    <p key={i} className="text-indigo-300">{step}</p>
                  ))}
                </div>
              </div>

              {/* Phased Milestones */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>Phased Action Milestones</span>
                </h4>

                {roadmap.milestones.map((m, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass-card border border-border space-y-3">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <h5 className="text-sm font-bold text-white">{m.phase}</h5>
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                        {m.timeframe}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-indigo-300 block">Skills to Acquire:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.skillsToAcquire.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px] font-mono border border-indigo-500/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-semibold text-slate-300 block">Action Items:</span>
                      {m.actionItems.map((act, aIdx) => (
                        <div key={aIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl glass-card border border-border space-y-4">
              <BrainCircuit className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Awaiting Profile Input</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Configure your current role and destination target on the left to trigger multi-step reasoning and memory updates.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
