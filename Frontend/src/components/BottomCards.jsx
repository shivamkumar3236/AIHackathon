import React from 'react';
import { TrendingUp, Lightbulb, IndianRupee, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function BottomCards({ stats, onOpenCalculator }) {
  const predictionVal = stats?.nextWeekPrediction?.electricity || 720;
  const predictionUnit = stats?.nextWeekPrediction?.unit || 'kWh';
  const recommendationText = stats?.featuredRecommendation?.text || 'Reduce AC usage between 2-5 PM in Block A.';
  const savingAmount = stats?.estimatedMonthlySaving?.formatted || '₹17,000';
  const savingPercent = stats?.estimatedMonthlySaving?.label || '(~20% reduction)';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* 1. Next Week Prediction */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              Next Week Prediction (Electricity)
            </span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {predictionVal}
            </span>
            <span className="text-sm font-semibold text-slate-400">
              {predictionUnit}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Forecast model: Time-Series</span>
          <span className="text-emerald-400 font-semibold">94% Confidence</span>
        </div>
      </div>

      {/* 2. AI Recommendation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              AI Recommendation
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>

          <p className="text-sm font-medium text-slate-200 mt-1 leading-relaxed">
            {recommendationText}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Target: Block A HVAC</span>
          <span className="text-emerald-400 font-semibold">High Priority</span>
        </div>
      </div>

      {/* 3. Estimated Monthly Saving */}
      <div 
        onClick={onOpenCalculator}
        className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-emerald-500/40 transition-all cursor-pointer group"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              Estimated Monthly Saving
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {savingAmount}
            </span>
            <span className="text-xs font-bold text-emerald-400/80">
              {savingPercent}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Click to open Savings Calculator</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
