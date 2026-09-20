import React from 'react';
import { Calendar, User, Zap, RefreshCw, LogIn, LogOut, Shield, Sparkles } from 'lucide-react';

export default function Header({ onOpenSimulate, onSeedData, isSeeding, currentUser, onOpenAuth, onLogout }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
      {/* Welcome Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Hello, {currentUser ? currentUser.name.split(' ')[0] : 'Campus'}!
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-2">
          <span>Smarter Resources.</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-emerald-600 font-bold">A Greener Campus.</span>
        </p>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Date Display */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>{formattedDate}</span>
        </div>

        {/* Simulate Spike Button */}
        <button
          onClick={onOpenSimulate}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold transition-all shadow-sm"
          title="Inject spike to test anomaly detection"
        >
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>Simulate Spike</span>
        </button>

        {/* Seed Data Button */}
        <button
          onClick={onSeedData}
          disabled={isSeeding}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-all shadow-sm"
          title="Reset database to default hackathon scenario"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSeeding ? 'animate-spin' : ''}`} />
          <span>Reset Data</span>
        </button>

        {/* User Profile / Login Button */}
        {currentUser ? (
          <div className="flex items-center gap-2 pl-1">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left">
                <span className="font-bold text-slate-800 text-xs block leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block leading-tight">
                  {currentUser.role} • {currentUser.assignedBuilding || 'Campus'}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 text-slate-500 border border-slate-200 text-xs transition-colors shadow-sm"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
