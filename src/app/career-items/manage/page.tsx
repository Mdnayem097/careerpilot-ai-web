'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { fetchApi } from '../../../lib/api';
import { CareerItem } from '../../../types';
import { Settings, Trash2, Edit3, PlusCircle, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ManageItemPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [items, setItems] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadUserItems = async () => {
    setLoading(true);
    try {
      const res = await fetchApi<{ items: CareerItem[] }>('/career-items/my-items');
      setItems(res.items);
    } catch (err) {
      console.error('Failed to load user items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserItems();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Authentication Required</h2>
        <p className="text-xs text-slate-400">Please sign in to manage your posted career items.</p>
        <button onClick={() => router.push('/auth/login')} className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold">
          Sign In
        </button>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career item? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      await fetchApi(`/career-items/${id}`, { method: 'DELETE' });
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      alert('Failed to delete item');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Settings className="w-6 h-6 text-primary-light" />
            <span>Manage Posted Career Items</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View, edit, or delete opportunities created under your profile.
          </p>
        </div>

        <Link
          href="/career-items/add"
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors flex items-center space-x-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New</span>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl glass-card animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card border border-border space-y-4">
          <ShieldCheck className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Created Items Yet</h3>
          <p className="text-xs text-slate-400">You haven't posted any jobs or skill pathways yet.</p>
          <Link href="/career-items/add" className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-semibold border border-emerald-500/30">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl glass-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="p-4">Title & Organization</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Compensation</th>
                  <th className="p-4">Date Posted</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-slate-200">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div>
                        <Link href={`/career-items/${item._id}`} className="hover:text-primary-light transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-[11px] font-normal text-slate-400">{item.companyOrProvider}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 text-[10px] font-semibold border border-border">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-emerald-400">{item.salaryOrCost}</td>
                    <td className="p-4 text-slate-400 font-mono">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/career-items/${item._id}`}
                        className="p-2 text-slate-400 hover:text-white inline-block"
                        title="View Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors inline-block"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
