import React from 'react';
import { 
  LayoutDashboard, 
  Gauge, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  CircleDollarSign, 
  Settings, 
  Leaf, 
  Sparkles 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, alertCount = 1 }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'resources', label: 'Resources', icon: Gauge },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: alertCount },
    { id: 'predictions', label: 'Predictions', icon: TrendingUp },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'calculator', label: 'Cost / Saving', icon: CircleDollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 ai-glass border-r border-white/[0.07] flex flex-col justify-between p-4 select-none shrink-0 min-h-screen relative z-20">
      <div>
        {/* Brand Logo with AI Glow */}
        <div className="flex items-center gap-3 px-3 py-4 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-1 ring-white/20">
            <Leaf className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
              <span>Campus Green</span>
            </h1>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Smart Resource AI</span>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.18)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]' 
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Status with AI Pulse */}
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-slate-200 text-[11px]">AI Model v2.4 Active</p>
            <p className="text-slate-500 text-[10px]">Real-time IoT sync</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
