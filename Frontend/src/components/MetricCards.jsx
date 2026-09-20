import React from 'react';
import { Zap, Droplets, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      trendColor: 'text-rose-400',
      trendBg: 'bg-rose-500/10 border-rose-500/20',
      trendText: `↑ ${electricity.changePercent}% (vs normal)`,
      badge: 'Spike Detected'
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
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      trendColor: 'text-emerald-400',
      trendBg: 'bg-emerald-500/10 border-emerald-500/20',
      trendText: `↓ ${water.changePercent}% (vs normal)`,
      badge: 'Optimal'
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
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      trendColor: 'text-amber-400',
      trendBg: 'bg-amber-500/10 border-amber-500/20',
      trendText: `↑ ${waste.changePercent}% (vs normal)`,
      badge: 'Monitor'
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
            className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 rounded-2xl p-5 transition-all duration-200 hover:border-slate-700 shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            {/* Subtle glow effect */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${card.iconBg}`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span className="font-semibold text-slate-300 text-sm">
                  {card.title}
                </span>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${card.trendBg} ${card.trendColor}`}>
                {card.badge}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {card.value}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                {card.unit}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
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
