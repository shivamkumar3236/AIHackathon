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
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">
              Next Week Prediction (Electricity)
            </span>
            <div className="p-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {predictionVal}
            </span>
            <span className="text-sm font-bold text-slate-500">
              {predictionUnit}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Model: Time-Series</span>
          <span className="text-blue-600 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>94% Confidence</span>
          </span>
        </div>
      </div>

      {/* 2. AI Recommendation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">
              AI Recommendation
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
            {recommendationText}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Target: Block A HVAC</span>
          <span className="text-emerald-700 font-bold">High Impact</span>
        </div>
      </div>

      {/* 3. Estimated Monthly Saving */}
      <div 
        onClick={onOpenCalculator}
        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-emerald-300"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">
              Estimated Monthly Saving
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-700 tracking-tight">
              {savingAmount}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {savingPercent}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Savings Calculator</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
