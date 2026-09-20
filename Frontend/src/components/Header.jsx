import React from 'react';
import { Calendar, User, Zap, RefreshCw, LogIn, LogOut, Shield } from 'lucide-react';

export default function Header({ onOpenSimulate, onSeedData, isSeeding, currentUser, onOpenAuth, onLogout }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
      {/* Welcome Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Hello, {currentUser ? currentUser.name.split(' ')[0] : 'Campus'}!
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-0.5 flex items-center gap-2">
          <span>Smarter Resources.</span>
          <span className="inline-block w-1 h-1 rounded-full bg-emerald-400" />
          <span className="text-emerald-400">A Greener Campus.</span>
        </p>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center flex-wrap gap-3">
        {/* Date Display */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs font-semibold shadow-inner">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>{formattedDate}</span>
        </div>

        {/* Simulate Spike Button */}
        <button
          onClick={onOpenSimulate}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all duration-150 shadow-sm"
          title="Inject spike to test anomaly detection"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Simulate Spike</span>
        </button>

        {/* Seed Data Button */}
        <button
          onClick={onSeedData}
          disabled={isSeeding}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all duration-150"
          title="Reset database to default hackathon scenario"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isSeeding ? 'animate-spin' : ''}`} />
          <span>Reset Data</span>
        </button>

        {/* User Profile / Login Button */}
        {currentUser ? (
          <div className="flex items-center gap-2 pl-1">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-md">
              <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs">
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
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 border border-slate-700/80 text-xs transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
