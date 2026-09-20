import React from 'react';
import { X, AlertTriangle, CheckCircle, ArrowRight, Zap } from 'lucide-react';

export default function AnomalyDetailModal({ alert, onClose, onResolve }) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Anomaly Diagnostics</h3>
            <p className="text-xs text-rose-700 font-semibold">
              Severity: {alert.severity || 'High'} • Status: {alert.resolved ? 'Resolved' : 'Active'}
            </p>
          </div>
        </div>

        {/* Anomaly Message */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 mb-4">
          <p className="text-sm font-semibold text-rose-950">
            {alert.message}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-rose-200">
              <span className="text-slate-500 block">Current Consumption:</span>
              <span className="text-base font-extrabold text-rose-600">180 kWh</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-rose-200">
              <span className="text-slate-500 block">Normal Baseline:</span>
              <span className="text-base font-extrabold text-slate-800">146 kWh</span>
            </div>
          </div>
        </div>

        {/* Root Cause & AI Analysis */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            AI Root Cause Analysis
          </h4>
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5 text-blue-900">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Simultaneous HVAC Peak in Lecture Halls 1-4</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              Cooling load doubled between 2:00 PM and 5:00 PM due to thermostat setpoint at 20°C and concurrent projector heat dissipation.
            </p>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recommended Actions
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Increase thermostat setpoint to 24°C in unoccupied rooms.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Stagger lab equipment startup to avoid instantaneous kW surge.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          {!alert.resolved && (
            <button
              onClick={() => {
                onResolve(alert.id || alert._id);
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
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
