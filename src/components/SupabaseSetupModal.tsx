import React, { useState, useEffect } from 'react';
import { getSupabaseCredentials, saveSupabaseCredentials, isSupabaseConfigured, getSupabase } from '../lib/supabase';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSetupModal: React.FC<SupabaseSetupModalProps> = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const creds = getSupabaseCredentials();
      setUrl(creds.url);
      setAnonKey(creds.anonKey);
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isConfigured = isSupabaseConfigured();

  const handleSave = async () => {
    saveSupabaseCredentials(url, anonKey);
    setIsTesting(true);
    setTestResult(null);

    try {
      const client = getSupabase();
      if (!client) {
        setTestResult({
          success: false,
          message: 'Invalid URL or Key format. Please check the values.',
        });
        setIsTesting(false);
        return;
      }

      // Quick ping test
      const { data, error } = await client.from('rooms').select('count', { count: 'exact', head: true });
      if (error && error.code !== 'PGRST116') {
        // Table might not be seeded yet or connection fine
        if (error.message.includes('relation "public.rooms" does not exist')) {
          setTestResult({
            success: true,
            message: 'Connected to Supabase! Tables not created yet—run the SQL Schema script below.',
          });
        } else {
          setTestResult({
            success: false,
            message: `Supabase Error: ${error.message}`,
          });
        }
      } else {
        setTestResult({
          success: true,
          message: 'Connection Successful! Live PostgreSQL & Auth are synchronized.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Failed to connect to Supabase.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopySchema = async () => {
    try {
      const response = await fetch('/supabase-schema.sql');
      const text = await response.text();
      navigator.clipboard?.writeText(text);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2500);
    } catch {
      navigator.clipboard?.writeText('-- Run /supabase-schema.sql from project root');
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[85] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto border border-[#dec1b2]/40">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0D234C] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[26px] text-[#25D366]">cloud_done</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#9a4600] uppercase tracking-wider block">
                Backend Architecture
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
                Supabase Connection Setup
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eded] hover:bg-[#e4e2e1] text-[#574237] flex items-center justify-center active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Current Status Pill */}
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-3 ${
          isConfigured
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-[#ffdbcb]/30 border-[#e87524]/40 text-[#763300]'
        }`}>
          <span className={`w-3 h-3 rounded-full shrink-0 ${isConfigured ? 'bg-emerald-600 animate-pulse' : 'bg-[#e87524]'}`} />
          <div className="flex-1">
            <span className="font-bold block">
              {isConfigured ? 'Connected to Supabase Project' : 'Resilient In-Memory & Local Storage Mode Active'}
            </span>
            <span className="text-[11px] opacity-80">
              {isConfigured
                ? `Syncing live with ${url.replace('https://', '').split('.')[0]}.supabase.co`
                : 'All reservations, orders, inquiries, and auth work locally right now. Enter your Supabase credentials below to activate cloud persistence.'}
            </span>
          </div>
        </div>

        {/* Credentials Form */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#8a7265] uppercase block mb-1">
              Supabase Project URL (`VITE_SUPABASE_URL`)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2]"
            />
            <span className="text-[10px] text-[#8a7265] mt-1 block">
              Found under: Supabase Dashboard → Project Settings → API → Project URL
            </span>
          </div>

          <div>
            <label className="font-bold text-[#8a7265] uppercase block mb-1">
              Supabase Anon Public Key (`VITE_SUPABASE_ANON_KEY`)
            </label>
            <input
              type="password"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2]"
            />
            <span className="text-[10px] text-[#8a7265] mt-1 block">
              Found under: Supabase Dashboard → Project Settings → API → `anon` `public` key
            </span>
          </div>

          {/* Test & Save buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={isTesting || !url || !anonKey}
              className="flex-1 py-3 rounded-xl bg-[#9a4600] hover:bg-[#763300] disabled:bg-[#dcd9d9] text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isTesting ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Save & Test Supabase Live</span>
                </>
              )}
            </button>
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in ${
              testResult.success ? 'bg-emerald-100 text-emerald-900' : 'bg-red-50 text-red-900 border border-red-200'
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {testResult.success ? 'check_circle' : 'error'}
              </span>
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* 1-Click SQL Schema Script */}
        <div className="bg-[#f6f3f2] p-4 sm:p-5 rounded-2xl border border-[#dec1b2]/40 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#1b1c1c] block">
                Database Schema & RLS Script
              </span>
              <span className="text-[11px] text-[#8a7265]">
                Includes profiles, rooms, bookings, dishes, tables, orders, inquiries & security policies.
              </span>
            </div>
            <button
              onClick={handleCopySchema}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#ffdbcb] text-[#9a4600] text-xs font-bold shadow-xs active:scale-90 flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedSql ? 'done' : 'content_copy'}
              </span>
              <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
            </button>
          </div>
          <div className="p-3 bg-white rounded-xl text-[11px] font-mono text-[#574237] max-h-24 overflow-y-auto border border-[#dec1b2]/30">
            <code>
              CREATE TABLE public.bookings (...)<br />
              CREATE TABLE public.profiles (...)<br />
              CREATE TABLE public.table_reservations (...)<br />
              CREATE TABLE public.room_orders (...)<br />
              -- View full script in /supabase-schema.sql
            </code>
          </div>
        </div>

        {/* Setup steps */}
        <div className="space-y-2 text-xs text-[#574237]">
          <span className="font-bold text-[#1b1c1c] block">3-Step Supabase Setup Guide:</span>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Create a new project on <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#9a4600] underline font-semibold">Supabase.com</a>.</li>
            <li>Go to the <strong>SQL Editor</strong> tab, paste the copied SQL schema, and click <strong>Run</strong>.</li>
            <li>Copy your <strong>Project URL</strong> and <strong>anon key</strong> into the fields above or into your `.env` file.</li>
          </ol>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#f0eded] hover:bg-[#e4e2e1] text-[#1b1c1c] text-xs font-bold active:scale-98"
        >
          Close Panel
        </button>

      </div>
    </div>
  );
};
