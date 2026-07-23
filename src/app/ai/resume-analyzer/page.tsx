'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchApi } from '../../../lib/api';
import { ResumeAnalysis } from '../../../types';
import { FileText, Sparkles, AlertCircle, CheckCircle2, RefreshCw, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ResumeAnalyzerPage() {
  const { user } = useAuth();
  const [rawText, setRawText] = useState(
    `ALEX RIVERA\nFull Stack Engineer & AI Specialist\nEmail: alex@example.com | Portfolio: alexrivera.dev\n\nSUMMARY\nExperienced Software Engineer with 4+ years of building web applications with React, Next.js, and Node.js. Passionate about scaling REST APIs and deploying LLM tool agents.\n\nWORK EXPERIENCE\nSenior Software Engineer — TechCorp (2023 - Present)\n• Developed frontend user interfaces using Next.js 14 and React 18.\n• Built backend microservices using Express.js and MongoDB.\n• Reduced database query load by 30% by optimizing Mongoose indexes.\n\nSoftware Engineer — CodeLab (2021 - 2023)\n• Built state management for real-time dashboards.\n• Worked closely with cross-functional product teams.`
  );
  const [targetRole, setTargetRole] = useState('Senior AI Systems Engineer');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText || !targetRole) return;

    setError('');
    setLoading(true);

    try {
      const res = await fetchApi<{ analysis: ResumeAnalysis }>('/ai/resume-analyzer', {
        method: 'POST',
        body: JSON.stringify({ rawText, targetRole })
      });
      setAnalysis(res.analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to execute Agentic Resume Analyzer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary-light">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agentic Tool Execution Pipeline</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Agentic AI Resume Analyzer & ATS Optimizer</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Scans your raw resume against target job requirements, evaluates keyword density, scores ATS compatibility, and rewrites bullet points for maximum impact.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Input */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-border space-y-4">
            
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Target Role Benchmark</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-xs focus:outline-none focus:border-primary"
                >
                  <option value="Senior AI Systems Engineer">Senior AI Systems Engineer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Lead AI Architect">Lead AI Architect</option>
                  <option value="Product Manager">Product Manager</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Resume Raw Text</label>
                <textarea
                  rows={12}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-border text-slate-200 text-xs font-mono focus:outline-none focus:border-primary"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-xs shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center space-x-2 glow-button"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Agent Tools...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Run Agentic ATS Analysis</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

        {/* Right Column: Agent Results Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          {analysis ? (
            <div className="space-y-6">
              
              {/* ATS Score Header Card */}
              <div className="p-6 rounded-2xl glass-card border border-primary/30 bg-primary/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">ATS Match Score</span>
                  <div className="text-4xl font-black text-white mt-1 flex items-baseline space-x-1">
                    <span>{analysis.atsScore}</span>
                    <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium mt-1">
                    {analysis.atsScore > 80 ? '✓ Optimized for Enterprise ATS Parsers' : '⚠️ Action required to pass automated screening'}
                  </p>
                </div>

                <div className="w-20 h-20 rounded-full border-4 border-primary/40 flex items-center justify-center bg-card shadow-inner">
                  <span className="text-lg font-extrabold text-primary-light">{analysis.atsScore}%</span>
                </div>
              </div>

              {/* Extracted & Missing Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl glass-card border border-emerald-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Detected Keywords ({analysis.extractedSkills.length})</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysis.extractedSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-rose-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>Missing Target Keywords ({analysis.missingKeywords.length})</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysis.missingKeywords.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[10px] font-mono border border-rose-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* AI Bullet Point Enhancer Recommendations */}
              <div className="p-6 rounded-2xl glass-card border border-border space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-primary-light" />
                  <span>Agentic AI Bullet Enhancer & Suggestions</span>
                </h4>

                <div className="space-y-4">
                  {analysis.improvementSuggestions.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-border space-y-2 text-xs">
                      <div className="flex items-center justify-between text-indigo-300 font-semibold">
                        <span>Section: {item.section}</span>
                      </div>
                      <p className="text-slate-400"><strong className="text-slate-200">Issue:</strong> {item.issue}</p>
                      <p className="text-slate-400"><strong className="text-slate-200">Recommendation:</strong> {item.recommendation}</p>
                      <div className="mt-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 font-mono">
                        <span className="text-[10px] uppercase font-sans text-emerald-400 block mb-1">AI Suggested Rewrite:</span>
                        {item.revisedText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl glass-card border border-border space-y-4">
              <FileText className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Ready for Analysis</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Paste your resume on the left and select your target position to execute the Agentic ATS pipeline.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
