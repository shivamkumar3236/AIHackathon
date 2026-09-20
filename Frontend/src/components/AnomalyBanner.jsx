import React from 'react';
import { AlertTriangle, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function AnomalyBanner({ alert, onViewDetails }) {
  const currentAlert = alert || {
    resourceType: 'Electricity',
    building: 'Block A',
    message: 'Block A electricity usage is 23% higher than normal.',
    severity: 'High'
  };

  return (
    <div className="ai-glass rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 relative overflow-hidden group border border-rose-500/30 hover:border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.12)] h-full">
      {/* Background ambient glow */}
      <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

      <div>
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-rose-300 text-sm flex items-center gap-2">
            <span>Anomaly Detected</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-extrabold">
              {currentAlert.severity || 'High'}
            </span>
          </h3>
        </div>

        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
          {currentAlert.message}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onViewDetails(currentAlert)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(244,63,94,0.35)] flex items-center justify-center gap-1.5"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
