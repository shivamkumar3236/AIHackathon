import React from 'react';
import { Zap, Droplets, Trash2, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function MetricCards({ stats }) {
  const electricity = stats?.electricity || {
    current: 180,
    unit: 'kWh',
    changePercent: 23,
    direction: 'up',
    label: '+23% (vs normal)'
  };

  const water = stats?.water || {
    current: 320,
    unit: 'L',
    changePercent: 8,
    direction: 'down',
    label: '-8% (vs normal)'
  };

  const waste = stats?.waste || {
    current: 50,
    unit: 'kg',
    changePercent: 12,
    direction: 'up',
    label: '+12% (vs normal)'
  };

  const cards = [
    {
      id: 'electricity',
      title: 'Electricity',
      value: electricity.current,
      unit: electricity.unit,
      changePercent: electricity.changePercent,
      direction: electricity.direction,
      icon: Zap,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
      trendColor: 'text-rose-400',
      trendBg: 'bg-rose-500/10 border-rose-500/25',
      trendText: `↑ ${electricity.changePercent}% (vs normal)`,
      badge: 'Spike Detected',
      glowColor: 'bg-amber-500/10'
    },
    {
      id: 'water',
      title: 'Water',
      value: water.current,
      unit: water.unit,
      changePercent: water.changePercent,
      direction: water.direction,
      icon: Droplets,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,254,0.15)]',
      trendColor: 'text-emerald-400',
      trendBg: 'bg-emerald-500/10 border-emerald-500/25',
      trendText: `↓ ${water.changePercent}% (vs normal)`,
      badge: 'Optimal',
      glowColor: 'bg-cyan-500/10'
    },
    {
      id: 'waste',
      title: 'Waste',
      value: waste.current,
      unit: waste.unit,
      changePercent: waste.changePercent,
      direction: waste.direction,
      icon: Trash2,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      trendColor: 'text-amber-400',
      trendBg: 'bg-amber-500/10 border-amber-500/25',
      trendText: `↑ ${waste.changePercent}% (vs normal)`,
      badge: 'Monitor',
      glowColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isUp = card.direction === 'up';

        return (
          <div
            key={card.id}
            className="ai-glass-card rounded-2xl p-5 transition-all duration-300 relative overflow-hidden group hover:-translate-y-0.5"
          >
            {/* Ambient corner glow */}
            <div className={`absolute -top-12 -right-12 w-32 h-32 ${card.glowColor} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${card.iconBg}`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span className="font-bold text-slate-200 text-xs tracking-wide">
                  {card.title}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.trendBg} ${card.trendColor}`}>
                {card.badge}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {card.value}
              </span>
              <span className="text-sm font-bold text-slate-400">
                {card.unit}
              </span>
            </div>

            <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold">
              <span className={`flex items-center gap-0.5 ${card.trendColor}`}>
                {isUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {card.trendText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
