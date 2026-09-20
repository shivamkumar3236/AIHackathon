import React from 'react';
import { X, AlertTriangle, CheckCircle, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export default function AnomalyDetailModal({ alert, onClose, onResolve }) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Anomaly Diagnostics</h3>
            <p className="text-xs text-rose-400 font-semibold">
              Severity: {alert.severity || 'High'} • Status: {alert.resolved ? 'Resolved' : 'Active'}
            </p>
          </div>
        </div>

        {/* Anomaly Message */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4">
          <p className="text-sm font-semibold text-slate-200">
            {alert.message}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Current Consumption:</span>
              <span className="text-base font-extrabold text-rose-400">180 kWh</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Normal Baseline:</span>
              <span className="text-base font-extrabold text-slate-300">146 kWh</span>
            </div>
          </div>
        </div>

        {/* Root Cause & AI Analysis */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            AI Root Cause Analysis
          </h4>
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200 space-y-1.5">
            <p className="font-semibold flex items-center gap-1.5 text-blue-300">
              <Zap className="w-3.5 h-3.5" />
              <span>Simultaneous HVAC Peak in Lecture Halls 1-4</span>
            </p>
            <p className="text-slate-300 leading-relaxed">
              Cooling load doubled between 2:00 PM and 5:00 PM due to thermostat setpoint at 20°C and concurrent projector heat dissipation.
            </p>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recommended Actions
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Increase thermostat setpoint to 24°C in unoccupied rooms.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Stagger lab equipment startup to avoid instantaneous kW surge.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          {!alert.resolved && (
            <button
              onClick={() => {
                onResolve(alert.id || alert._id);
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Resolve & Apply Policy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
