'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchApi } from '../../../lib/api';
import { CareerItem } from '../../../types';
import { MapPin, DollarSign, Briefcase, Calendar, ExternalLink, ArrowLeft, CheckCircle2, User } from 'lucide-react';

export default function DetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<CareerItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await fetchApi<{ item: CareerItem }>(`/career-items/${params.id}`);
        setItem(res.item);
      } catch (err: any) {
        setError(err.message || 'Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadItem();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="h-96 rounded-3xl glass-card animate-pulse" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Item Not Found</h2>
        <p className="text-xs text-slate-400">{error || 'The requested career opportunity does not exist.'}</p>
        <Link href="/career-items" className="inline-block px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </button>

      {/* Main Details Header */}
      <div className="p-8 rounded-3xl glass-card border border-border space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary-light text-xs font-semibold border border-primary/20">
                {item.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                {item.type}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                {item.experienceLevel}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-white">{item.title}</h1>
            <p className="text-sm font-semibold text-indigo-300">{item.companyOrProvider}</p>
          </div>

          <a
            href={item.applicationUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2 self-start md:self-auto"
          >
            <span>Apply / Access Resource</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Metadata Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-border text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-mono">Location</span>
            <p className="text-slate-200 font-semibold flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.location}</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-mono">Compensation / Cost</span>
            <p className="text-emerald-400 font-semibold flex items-center space-x-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{item.salaryOrCost}</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-mono">Posted On</span>
            <p className="text-slate-200 font-semibold flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-mono">Posted By</span>
            <p className="text-slate-200 font-semibold flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{typeof item.userId === 'object' ? item.userId.name : 'Community Member'}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-bold text-white">Overview & Role Summary</h3>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>

        {/* Requirements */}
        {item.requirements && item.requirements.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border/50">
            <h3 className="text-lg font-bold text-white">Key Requirements & Expectations</h3>
            <ul className="space-y-2">
              {item.requirements.map((req, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills Tag Cloud */}
        {item.skillsRequired && item.skillsRequired.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border/50">
            <h3 className="text-lg font-bold text-white">Required Skills & Stack</h3>
            <div className="flex flex-wrap gap-2">
              {item.skillsRequired.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-indigo-300 text-xs font-mono border border-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
