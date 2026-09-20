import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { Zap, Droplets, Trash2, Sparkles } from 'lucide-react';

export default function UsageChart({ chartData }) {
  const [selectedMetric, setSelectedMetric] = useState('Electricity');

  const metricConfig = {
    Electricity: {
      color: '#00f2fe',
      gradientFrom: '#00f2fe',
      gradientTo: '#4facfe',
      unit: 'kWh',
      icon: Zap,
      normalBaseline: 146
    },
    Water: {
      color: '#05d5b3',
      gradientFrom: '#05d5b3',
      gradientTo: '#00b4d8',
      unit: 'L',
      icon: Droplets,
      normalBaseline: 348
    },
    Waste: {
      color: '#10b981',
      gradientFrom: '#10b981',
      gradientTo: '#059669',
      unit: 'kg',
      icon: Trash2,
      normalBaseline: 45
    }
  };

  const current = metricConfig[selectedMetric];

  // Custom AI glass tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const baseline = current.normalBaseline;
      const diff = Math.round(((val - baseline) / baseline) * 100);

      return (
        <div className="ai-glass p-3.5 rounded-2xl shadow-2xl border border-white/10 text-xs">
          <p className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.color }} />
            <span>{label}</span>
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-extrabold text-white text-base">{val}</span>
            <span className="text-slate-400 font-semibold">{current.unit}</span>
          </div>
          <p className={`mt-1 font-bold ${diff > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {diff > 0 ? `+${diff}% vs baseline` : `${diff}% vs baseline`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="ai-glass-card rounded-2xl p-5 shadow-lg flex flex-col justify-between h-full">
      {/* Header with Title & Metric Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>7 Days Usage ({selectedMetric})</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI Telemetry</span>
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Campus consumption timeline with automated baseline tracking
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/[0.08] text-xs font-semibold">
          {Object.keys(metricConfig).map((key) => {
            const isSelected = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area/Line Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={current.gradientFrom} stopOpacity={0.45} />
                <stop offset="95%" stopColor={current.gradientTo} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />

            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Reference baseline line */}
            <ReferenceLine
              y={current.normalBaseline}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: `Baseline (${current.normalBaseline} ${current.unit})`,
                fill: '#94a3b8',
                fontSize: 10,
                position: 'insideTopRight'
              }}
            />

            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={current.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#gradient-${selectedMetric})`}
              dot={{ r: 4, fill: current.color, stroke: '#070a11', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ffffff', stroke: current.color, strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Graph Footer Stats */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/[0.06] text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.8)]" style={{ backgroundColor: current.color }} />
          <span>Actual Consumption</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-0.5 border-t border-dashed border-slate-500" />
          <span>Normal Baseline</span>
        </div>
      </div>
    </div>
  );
}
