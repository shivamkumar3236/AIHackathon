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
import { Zap, Droplets, Trash2, TrendingUp } from 'lucide-react';

export default function UsageChart({ chartData }) {
  const [selectedMetric, setSelectedMetric] = useState('Electricity');

  const metricConfig = {
    Electricity: {
      color: '#3b82f6', // blue curve like image
      gradientFrom: '#3b82f6',
      gradientTo: '#1d4ed8',
      unit: 'kWh',
      icon: Zap,
      normalBaseline: 146
    },
    Water: {
      color: '#06b6d4',
      gradientFrom: '#06b6d4',
      gradientTo: '#0891b2',
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

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const baseline = current.normalBaseline;
      const diff = Math.round(((val - baseline) / baseline) * 100);

      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-slate-300 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: current.color }} />
            <span className="font-extrabold text-white text-sm">{val} {current.unit}</span>
          </div>
          <p className={`mt-1 font-semibold ${diff > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {diff > 0 ? `+${diff}% vs normal` : `${diff}% vs normal`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
      {/* Header with Title & Metric Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>7 Days Usage ({selectedMetric})</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
              Live Trend
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Campus consumption history with anomaly markers
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          {Object.keys(metricConfig).map((key) => {
            const isSelected = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
                <stop offset="5%" stopColor={current.gradientFrom} stopOpacity={0.4} />
                <stop offset="95%" stopColor={current.gradientTo} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

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
              stroke="#94a3b8"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: `Normal (${current.normalBaseline} ${current.unit})`,
                fill: '#94a3b8',
                fontSize: 10,
                position: 'insideTopRight'
              }}
            />

            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={current.color}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#gradient-${selectedMetric})`}
              dot={{ r: 4, fill: current.color, stroke: '#0f172a', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ffffff', stroke: current.color, strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Graph Footer Stats */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Actual Usage</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-0.5 border-t border-dashed border-slate-400" />
          <span>Normal Baseline</span>
        </div>
      </div>
    </div>
  );
}
