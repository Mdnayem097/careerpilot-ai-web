'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import { CareerItem } from '../../types';
import { Search, Filter, MapPin, DollarSign, Briefcase, ChevronRight, PlusCircle, ArrowUpRight } from 'lucide-react';

export default function ListingPage() {
  const [items, setItems] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [experienceLevel, setExperienceLevel] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (type !== 'All') params.append('type', type);
      if (experienceLevel !== 'All') params.append('experienceLevel', experienceLevel);
      params.append('page', page.toString());
      params.append('limit', '6');

      const res = await fetchApi<{ items: CareerItem[]; pagination: { totalPages: number } }>(
        `/career-items?${params.toString()}`
      );
      setItems(res.items);
      setTotalPages(res.pagination.totalPages || 1);
    } catch (err) {
      console.error('Error loading career items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [search, category, type, experienceLevel, page]);

  return (
    <div className="space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Career & Skill Directory</h1>
          <p className="text-slate-400 text-sm mt-1">Discover curated AI jobs, learning roadmaps, courses, and mentorships.</p>
        </div>
        <Link
          href="/career-items/add"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Career Item</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="p-6 rounded-2xl glass-card border border-border space-y-4">
        
        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by role title, technology (e.g. Next.js, Agentic AI), or provider..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-border text-white text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Dropdown Select Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-border text-slate-200 text-xs focus:outline-none focus:border-primary"
            >
              <option value="All">All Categories</option>
              <option value="Job Listing">Job Listing</option>
              <option value="Skill Pathway">Skill Pathway</option>
              <option value="Learning Resource">Learning Resource</option>
              <option value="Mentorship">Mentorship</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Engagement Type</label>
            <select
              value={type}
              onChange={(e) => { setType(e.target.value); setPage(1); }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-border text-slate-200 text-xs focus:outline-none focus:border-primary"
            >
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
              <option value="Course">Course</option>
              <option value="Certification">Certification</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => { setExperienceLevel(e.target.value); setPage(1); }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-border text-slate-200 text-xs focus:outline-none focus:border-primary"
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry-Level">Entry-Level</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid of Items */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl glass-card animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card border border-border space-y-3">
          <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Career Items Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or category filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="p-6 rounded-2xl glass-card border border-border hover:border-primary/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary-light text-[10px] font-semibold border border-primary/20">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{item.location}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-light transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">{item.companyOrProvider}</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skillsRequired?.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom metadata & Link */}
              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{item.salaryOrCost}</span>
                </span>

                <Link
                  href={`/career-items/${item._id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium hover:bg-primary hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium disabled:opacity-40 hover:bg-slate-700"
          >
            Previous
          </button>
          <span className="text-xs font-mono text-slate-400 px-3">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium disabled:opacity-40 hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
