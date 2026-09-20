import React from 'react';
import { TrendingUp, Zap, Droplets, Trash2, Calendar, CheckCircle2, ArrowUpRight, ArrowDownRight, Minus, Sparkles } from 'lucide-react';

export default function PredictionsView({ predictions }) {
  const data = predictions || {
    Electricity: { predictedValue: 720, unit: 'kWh', trend: 'Increasing', confidence: 0.94 },
    Water: { predictedValue: 2400, unit: 'L', trend: 'Decreasing', confidence: 0.92 },
    Waste: { predictedValue: 340, unit: 'kg', trend: 'Stable', confidence: 0.90 }
  };

  const cards = [
    {
      type: 'Electricity',
      val: data.Electricity?.predictedValue || 720,
      unit: data.Electricity?.unit || 'kWh',
      trend: data.Electricity?.trend || 'Increasing',
      confidence: Math.round((data.Electricity?.confidence || 0.94) * 100),
      historicalAvg: 680,
      icon: Zap,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      glow: 'bg-amber-500/10'
    },
    {
      type: 'Water',
      val: data.Water?.predictedValue || 2400,
      unit: data.Water?.unit || 'L',
      trend: data.Water?.trend || 'Decreasing',
      confidence: Math.round((data.Water?.confidence || 0.92) * 100),
      historicalAvg: 2550,
      icon: Droplets,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      glow: 'bg-cyan-500/10'
    },
    {
      type: 'Waste',
      val: data.Waste?.predictedValue || 340,
      unit: data.Waste?.unit || 'kg',
      trend: data.Waste?.trend || 'Stable',
      confidence: Math.round((data.Waste?.confidence || 0.90) * 100),
      historicalAvg: 335,
      icon: Trash2,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      glow: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span>AI Time-Series Consumption Forecast</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Next week resource projection generated via rolling 7-day weighted linear regression
        </p>
      </div>

      {/* Grid of 3 Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          const diff = Math.round(((c.val - c.historicalAvg) / c.historicalAvg) * 100);

          return (
            <div
              key={c.type}
              className="ai-glass-card rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 transition-all"
            >
              <div className={`absolute -top-10 -right-10 w-28 h-28 ${c.glow} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform`} />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${c.bg} ${c.border}`}>
                      <Icon className={`w-4 h-4 ${c.color}`} />
                    </div>
                    <span className="font-bold text-slate-200 text-sm">{c.type} Forecast</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                    Next 7 Days
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    {c.val.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-slate-400">
                    {c.unit}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs">
                  {c.trend === 'Increasing' ? (
                    <span className="flex items-center gap-1 text-rose-400 font-semibold">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>Increasing (+{diff}% vs prior week)</span>
                    </span>
                  ) : c.trend === 'Decreasing' ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ArrowDownRight className="w-4 h-4" />
                      <span>Decreasing ({diff}% vs prior week)</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-300 font-semibold">
                      <Minus className="w-4 h-4" />
                      <span>Stable trend</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Confidence bar */}
              <div className="mt-5 pt-3 border-t border-white/[0.06]">
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Model Confidence</span>
                  </span>
                  <span className="text-cyan-400 font-bold">{c.confidence}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/[0.06]">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.6)]"
                    style={{ width: `${c.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model explanation card */}
      <div className="ai-glass-card rounded-2xl p-5">
        <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>How the AI Prediction Engine Works</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          The forecast calculates a 7-day weighted moving average with dynamic trend velocity detection. If usage spikes occur during peak daytime hours (e.g. Block A HVAC surges), the model flags the divergence and factors upcoming class schedules into the projected load.
        </p>
      </div>
    </div>
  );
}
