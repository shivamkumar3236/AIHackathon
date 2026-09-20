import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, ShieldCheck, Zap, Droplets, Trash2 } from 'lucide-react';

export default function AlertsView({ alerts, onResolveAlert, onSelectAlert }) {
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = (alerts || []).filter(a => {
    const matchesSeverity = filterSeverity === 'All' || a.severity === filterSeverity;
    const matchesStatus = filterStatus === 'All' ||
                          (filterStatus === 'Active' && !a.resolved) ||
                          (filterStatus === 'Resolved' && a.resolved);
    return matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <span>AI Anomaly Alerts Center</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time threshold and time-series spike detections (usage &gt; 1.5x normal)
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Severity:</span>
          {['All', 'Critical', 'High', 'Medium'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterSeverity === sev
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs ml-auto">
          <span className="text-slate-400 font-semibold">Status:</span>
          {['All', 'Active', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === st
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Cards List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/90 border border-slate-800 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-200">No anomalies found matching your filter</p>
            <p className="text-xs text-slate-500 mt-1">All resource systems operating within normal parameters.</p>
          </div>
        ) : (
          filtered.map((alert) => {
            const isResolved = alert.resolved;
            return (
              <div
                key={alert.id || alert._id}
                className={`p-5 rounded-2xl border transition-all ${
                  isResolved
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-75'
                    : 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50 shadow-lg'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${
                      isResolved
                        ? 'bg-slate-800 border-slate-700 text-slate-400'
                        : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                    }`}>
                      {alert.resourceType === 'Electricity' ? (
                        <Zap className="w-5 h-5" />
                      ) : alert.resourceType === 'Water' ? (
                        <Droplets className="w-5 h-5" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          alert.severity === 'Critical'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : alert.severity === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {alert.severity || 'High'}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          {alert.building || 'Campus'}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-white mt-1">
                        {alert.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        AI Recommended Action: {alert.suggestedAction || 'Check HVAC schedules and reduce excess load.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onSelectAlert(alert)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
                    >
                      Inspect
                    </button>
                    {!isResolved && (
                      <button
                        onClick={() => onResolveAlert(alert.id || alert._id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Resolve</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
