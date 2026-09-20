import React from 'react';
import { TrendingUp, Lightbulb, IndianRupee, ArrowUpRight, Sparkles } from 'lucide-react';

export default function BottomCards({ stats, onOpenCalculator }) {
  const predictionVal = stats?.nextWeekPrediction?.electricity || 720;
  const predictionUnit = stats?.nextWeekPrediction?.unit || 'kWh';
  const recommendationText = stats?.featuredRecommendation?.text || 'Reduce AC usage between 2-5 PM in Block A.';
  const savingAmount = stats?.estimatedMonthlySaving?.formatted || '₹17,000';
  const savingPercent = stats?.estimatedMonthlySaving?.label || '(~20% reduction)';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* 1. Next Week Prediction */}
      <div className="ai-glass-card rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all relative overflow-hidden group hover:-translate-y-0.5">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              Next Week Prediction (Electricity)
            </span>
            <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {predictionVal}
            </span>
            <span className="text-sm font-bold text-slate-400">
              {predictionUnit}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <span className="text-slate-400">Model: Time-Series</span>
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>94% Confidence</span>
          </span>
        </div>
      </div>

      {/* 2. AI Recommendation */}
      <div className="ai-glass-card rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all relative overflow-hidden group hover:-translate-y-0.5">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              AI Recommendation
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs sm:text-sm font-medium text-slate-200 mt-1 leading-relaxed">
            {recommendationText}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <span className="text-slate-400">Target: Block A HVAC</span>
          <span className="text-emerald-400 font-bold">High Impact</span>
        </div>
      </div>

      {/* 3. Estimated Monthly Saving */}
      <div 
        onClick={onOpenCalculator}
        className="ai-glass-card rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all cursor-pointer group hover:border-emerald-500/40 relative overflow-hidden hover:-translate-y-0.5"
      >
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              Estimated Monthly Saving
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {savingAmount}
            </span>
            <span className="text-xs font-bold text-emerald-300">
              {savingPercent}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span>Savings Calculator</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
