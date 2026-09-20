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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 select-none shrink-0 min-h-screen shadow-sm relative z-20">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-5 border-b border-slate-100 pb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-600/20">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-slate-900 tracking-tight">
              Campus Green
            </h1>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Smart Resource AI</span>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/80 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-rose-100 text-rose-700 border border-rose-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Status */}
      <div className="pt-4 border-t border-slate-100">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-60" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-800 text-[11px]">AI Model v2.4 Active</p>
            <p className="text-slate-500 text-[10px]">Real-time IoT sync</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
