import React from 'react';
import { Calendar, User, Zap, RefreshCw, LogIn, LogOut, Shield, Sparkles } from 'lucide-react';

export default function Header({ onOpenSimulate, onSeedData, isSeeding, currentUser, onOpenAuth, onLogout }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.07] mb-6">
      {/* Welcome Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Hello, {currentUser ? currentUser.name.split(' ')[0] : 'Campus'}!
          </span>
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-2">
          <span>Smarter Resources.</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-emerald-400 font-semibold">A Greener Campus.</span>
        </p>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Date Display */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>{formattedDate}</span>
        </div>

        {/* Simulate Spike Button */}
        <button
          onClick={onOpenSimulate}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all duration-200 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
          title="Inject spike to test anomaly detection"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulate Spike</span>
        </button>

        {/* Seed Data Button */}
        <button
          onClick={onSeedData}
          disabled={isSeeding}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] text-xs font-semibold transition-all duration-200"
          title="Reset database to default hackathon scenario"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isSeeding ? 'animate-spin' : ''}`} />
          <span>Reset Data</span>
        </button>

        {/* User Profile / Login Button */}
        {currentUser ? (
          <div className="flex items-center gap-2 pl-1">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] shadow-md hover:border-emerald-500/40 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left">
                <span className="font-bold text-slate-200 text-xs block leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold block leading-tight">
                  {currentUser.role} • {currentUser.assignedBuilding || 'Campus'}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 text-slate-400 border border-white/[0.08] text-xs transition-all"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
