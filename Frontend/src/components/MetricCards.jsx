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
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200',
      trendColor: 'text-rose-600',
      trendBg: 'bg-rose-50 border-rose-200',
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
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border-blue-200',
      trendColor: 'text-emerald-600',
      trendBg: 'bg-emerald-50 border-emerald-200',
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
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border-emerald-200',
      trendColor: 'text-amber-600',
      trendBg: 'bg-amber-50 border-amber-200',
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
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:border-slate-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${card.iconBg}`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span className="font-bold text-slate-700 text-xs tracking-wide">
                  {card.title}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.trendBg} ${card.trendColor}`}>
                {card.badge}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </span>
              <span className="text-sm font-bold text-slate-500">
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
