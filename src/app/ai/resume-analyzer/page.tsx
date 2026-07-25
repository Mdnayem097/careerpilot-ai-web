'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchApi } from '../../../lib/api';
import { ResumeAnalysis } from '../../../types';
import { 
  FileText, Sparkles, AlertCircle, CheckCircle2, 
  RefreshCw, Zap, Copy, Check 
} from 'lucide-react';

export default function ResumeAnalyzerPage() {
  const { user } = useAuth();
  const [rawText, setRawText] = useState(
    `ALEX RIVERA\nFull Stack Engineer & AI Specialist\nEmail: alex@example.com | Portfolio: alexrivera.dev\n\nSUMMARY\nExperienced Software Engineer with 4+ years of building web applications with React, Next.js, and Node.js. Passionate about scaling REST APIs and deploying LLM tool agents.\n\nWORK EXPERIENCE\nSenior Software Engineer — TechCorp (2023 - Present)\n• Developed frontend user interfaces using Next.js 14 and React 18.\n• Built backend microservices using Express.js and MongoDB.\n• Reduced database query load by 30% by optimizing Mongoose indexes.\n\nSoftware Engineer — CodeLab (2021 - 2023)\n• Built state management for real-time dashboards.\n• Worked closely with cross-functional product teams.`
  );
  const [targetRole, setTargetRole] = useState('Senior AI Systems Engineer');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState('');
  
  // Copy state for feedback
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to execute Agentic Resume Analyzer');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-400">
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
          <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/50 space-y-4 shadow-xl">
            
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Target Role Benchmark</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !rawText.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Agent Tools...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>Run Agentic ATS Analysis</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

        {/* Right Column: Agent Results Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            /* Skeleton Loader */
            <div className="space-y-6 animate-pulse">
              <div className="h-28 bg-slate-800/50 rounded-2xl border border-slate-700/50" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-slate-800/50 rounded-2xl border border-slate-700/50" />
                <div className="h-32 bg-slate-800/50 rounded-2xl border border-slate-700/50" />
              </div>
              <div className="h-48 bg-slate-800/50 rounded-2xl border border-slate-700/50" />
            </div>
          ) : analysis ? (
            /* Result Dashboard */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* ATS Score Header Card */}
              <div className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">ATS Match Score</span>
                  <div className="text-4xl font-black text-white mt-1 flex items-baseline space-x-1">
                    <span>{analysis.atsScore}</span>
                    <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </div>
                  <p className={`text-xs font-medium mt-1 ${analysis.atsScore > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {analysis.atsScore > 80 ? '✓ Optimized for Enterprise ATS Parsers' : '⚠️ Action required to pass automated screening'}
                  </p>
                </div>

                <div className="w-20 h-20 rounded-full border-4 border-indigo-500/40 flex items-center justify-center bg-slate-900 shadow-inner">
                  <span className="text-lg font-extrabold text-indigo-400">{analysis.atsScore}%</span>
                </div>
              </div>

              {/* Extracted & Missing Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-emerald-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Detected Keywords ({analysis.extractedSkills?.length || 0})</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysis.extractedSkills?.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/50 border border-rose-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>Missing Target Keywords ({analysis.missingKeywords?.length || 0})</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysis.missingKeywords?.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[10px] font-mono border border-rose-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Bullet Point Enhancer Recommendations */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Agentic AI Bullet Enhancer</span>
                </h4>

                <div className="space-y-4">
                  {analysis.improvementSuggestions?.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs relative group">
                      <div className="flex items-center justify-between text-indigo-300 font-semibold mb-2">
                        <span>Section: {item.section}</span>
                      </div>
                      <p className="text-slate-400"><strong className="text-slate-200">Issue:</strong> {item.issue}</p>
                      <p className="text-slate-400"><strong className="text-slate-200">Recommendation:</strong> {item.recommendation}</p>
                      
                      <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono relative pr-10">
                        <span className="text-[10px] uppercase font-sans text-emerald-400/80 block mb-1">AI Suggested Rewrite:</span>
                        {item.revisedText}
                        
                        {/* Copy Button */}
                        <button 
                          type="button"
                          onClick={() => handleCopy(item.revisedText, idx)}
                          className="absolute top-3 right-3 p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Copy text"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-slate-900/30 border border-dashed border-slate-700 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <FileText className="w-8 h-8 text-slate-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Ready for Analysis</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Paste your resume on the left and select your target position to execute the Agentic ATS pipeline.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}