import React from 'react';
import { AlertTriangle, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AnomalyBanner({ alert, onViewDetails }) {
  const isResolved = alert?.resolved === true;

  const currentAlert = alert || {
    id: 'alert-elec-default',
    resourceType: 'Electricity',
    building: 'Block A',
    message: 'Block A electricity usage is 23% higher than normal.',
    severity: 'High',
    resolved: false
  };

  if (isResolved) {
    return (
      <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all duration-200 h-full">
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
              <span>All Systems Normal</span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 font-extrabold">
                Optimal
              </span>
            </h3>
          </div>

          <p className="text-emerald-950 text-xs sm:text-sm leading-relaxed mb-4 font-semibold">
            Anomaly resolved. Thermostat & HVAC conservation policies have been successfully applied across Block A.
          </p>
        </div>

        <div className="pt-2">
          <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Policy Active & Enforced</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-rose-50/90 border border-rose-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all duration-200 h-full">
      <div>
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-rose-900 text-sm flex items-center gap-2">
            <span>Anomaly Detected</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300 font-extrabold">
              {currentAlert.severity || 'High'}
            </span>
          </h3>
        </div>

        <p className="text-rose-950 text-xs sm:text-sm leading-relaxed mb-4 font-semibold">
          {currentAlert.message}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onViewDetails(currentAlert)}
          className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-rose-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
