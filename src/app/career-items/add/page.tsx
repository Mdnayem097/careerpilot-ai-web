'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { fetchApi } from '../../../lib/api';
import { PlusCircle, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AddItemPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Job Listing' | 'Skill Pathway' | 'Learning Resource' | 'Mentorship'>('Job Listing');
  const [companyOrProvider, setCompanyOrProvider] = useState('');
  const [location, setLocation] = useState('Remote');
  const [type, setType] = useState<'Full-time' | 'Remote' | 'Contract' | 'Course' | 'Certification'>('Full-time');
  const [salaryOrCost, setSalaryOrCost] = useState('$150,000 - $180,000 / yr');
  const [experienceLevel, setExperienceLevel] = useState<'Entry-Level' | 'Mid-Level' | 'Senior' | 'Executive'>('Senior');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('TypeScript, Next.js 15, React, Node.js, Express');
  const [applicationUrl, setApplicationUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Authentication Required</h2>
        <p className="text-xs text-slate-400">You must be signed in to post a career item.</p>
        <button
          onClick={() => router.push('/auth/login')}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !companyOrProvider || !description || !salaryOrCost) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    setLoading(true);

    try {
      await fetchApi('/career-items', {
        method: 'POST',
        body: JSON.stringify({
          title,
          category,
          companyOrProvider,
          location,
          type,
          salaryOrCost,
          experienceLevel,
          description,
          requirements: requirements.split('\n').filter(Boolean),
          skillsRequired: skillsRequired.split(',').map((s) => s.trim()),
          applicationUrl
        })
      });

      router.push('/career-items');
    } catch (err: any) {
      setError(err.message || 'Error creating career item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      
      <button
        onClick={() => router.back()}
        className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel & Back</span>
      </button>

      <div className="p-8 rounded-3xl glass-card border border-border space-y-6">
        
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <PlusCircle className="w-6 h-6 text-emerald-400" />
            <span>Post New Career Opportunity</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add a Job Listing, Skill Pathway, Learning Resource, or Mentorship program.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior AI Systems Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Company / Organization *</label>
              <input
                type="text"
                required
                value={companyOrProvider}
                onChange={(e) => setCompanyOrProvider(e.target.value)}
                placeholder="e.g. DeepMind Systems Inc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-xs focus:outline-none focus:border-primary"
              >
                <option value="Job Listing">Job Listing</option>
                <option value="Skill Pathway">Skill Pathway</option>
                <option value="Learning Resource">Learning Resource</option>
                <option value="Mentorship">Mentorship</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Engagement Type</label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-xs focus:outline-none focus:border-primary"
              >
                <option value="Full-time">Full-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
                <option value="Course">Course</option>
                <option value="Certification">Certification</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e: any) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-xs focus:outline-none focus:border-primary"
              >
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA (Hybrid)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Salary / Cost *</label>
              <input
                type="text"
                required
                value={salaryOrCost}
                onChange={(e) => setSalaryOrCost(e.target.value)}
                placeholder="e.g. $160,000 - $210,000 / yr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Description *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a thorough overview of the role, project, or learning pathway..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Requirements (One per line)</label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="• 5+ years TypeScript experience&#10;• Experience with Next.js 15 App Router&#10;• Understanding of REST API microservices"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-xs font-mono focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Skills Required (Comma separated)</label>
            <input
              type="text"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              placeholder="TypeScript, Next.js 15, Express.js, Agentic AI, MongoDB"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Application / Resource Link</label>
            <input
              type="url"
              value={applicationUrl}
              onChange={(e) => setApplicationUrl(e.target.value)}
              placeholder="https://example.com/apply"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-border text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{loading ? 'Publishing Item...' : 'Publish Career Item'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
