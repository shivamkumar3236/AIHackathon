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
      color: '#2563eb', // crisp blue
      gradientFrom: '#3b82f6',
      gradientTo: '#93c5fd',
      unit: 'kWh',
      icon: Zap,
      normalBaseline: 146
    },
    Water: {
      color: '#0891b2',
      gradientFrom: '#06b6d4',
      gradientTo: '#a5f3fc',
      unit: 'L',
      icon: Droplets,
      normalBaseline: 348
    },
    Waste: {
      color: '#059669',
      gradientFrom: '#10b981',
      gradientTo: '#a7f3d0',
      unit: 'kg',
      icon: Trash2,
      normalBaseline: 45
    }
  };

  const current = metricConfig[selectedMetric];

  // Custom Light tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const baseline = current.normalBaseline;
      const diff = Math.round(((val - baseline) / baseline) * 100);

      return (
        <div className="bg-white p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.color }} />
            <span>{label}</span>
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-extrabold text-slate-900 text-base">{val}</span>
            <span className="text-slate-500 font-semibold">{current.unit}</span>
          </div>
          <p className={`mt-1 font-bold ${diff > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {diff > 0 ? `+${diff}% vs baseline` : `${diff}% vs baseline`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      {/* Header with Title & Metric Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>7 Days Usage ({selectedMetric})</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-blue-600" />
              <span>Live Telemetry</span>
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Campus consumption timeline with automated baseline tracking
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          {Object.keys(metricConfig).map((key) => {
            const isSelected = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={current.gradientFrom} stopOpacity={0.25} />
                <stop offset="95%" stopColor={current.gradientTo} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Reference baseline line */}
            <ReferenceLine
              y={current.normalBaseline}
              stroke="#94a3b8"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: `Baseline (${current.normalBaseline} ${current.unit})`,
                fill: '#64748b',
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
              dot={{ r: 4, fill: current.color, stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: current.color, stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Graph Footer Stats */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: current.color }} />
          <span>Actual Consumption</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-0.5 border-t border-dashed border-slate-400" />
          <span>Normal Baseline</span>
        </div>
      </div>
    </div>
  );
}
