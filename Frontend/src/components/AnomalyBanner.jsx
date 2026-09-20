import React from 'react';
import { AlertTriangle, ChevronRight, ShieldAlert } from 'lucide-react';

export default function AnomalyBanner({ alert, onViewDetails }) {
  const currentAlert = alert || {
    resourceType: 'Electricity',
    building: 'Block A',
    message: 'Block A electricity usage is 23% higher than normal.',
    severity: 'High'
  };

  return (
    <div className="bg-rose-950/30 border border-rose-500/30 hover:border-rose-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 relative overflow-hidden group">
      {/* Background ambient glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          </div>
          <h3 className="font-bold text-rose-400 text-base flex items-center gap-2">
            <span>Anomaly Detected</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-extrabold">
              {currentAlert.severity || 'High'}
            </span>
          </h3>
        </div>

        <p className="text-slate-200 text-sm leading-relaxed mb-4">
          {currentAlert.message}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onViewDetails(currentAlert)}
          className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wide transition-all duration-150 shadow-md shadow-rose-600/30 flex items-center justify-center gap-1.5"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
