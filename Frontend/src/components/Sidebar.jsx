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
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-sm shadow-emerald-600/20">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-tight">
                Campus Green
              </h1>
              <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold flex items-center gap-1 leading-tight">
                <Sparkles className="w-3 h-3" />
                <span>Smart Resource AI</span>
              </p>
            </div>
          </div>

          {/* Horizontal Navigation Items */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 touch-manipulation cursor-pointer border ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold border-emerald-200/90 shadow-sm'
                      : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100/90 hover:text-slate-900 active:bg-emerald-50/80 active:text-emerald-700 active:scale-95'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
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
          </div>

          {/* AI Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-60" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800 text-[10px] leading-tight">AI v2.4 Active</p>
              <p className="text-slate-500 text-[9px] leading-tight">Real-time IoT sync</p>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
