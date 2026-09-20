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
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span>AI Anomaly Alerts Center</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time threshold and time-series spike detections (usage &gt; 1.5x baseline)
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Severity:</span>
          {['All', 'Critical', 'High', 'Medium'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterSeverity === sev
                  ? 'bg-rose-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs ml-auto">
          <span className="text-slate-500 font-semibold">Status:</span>
          {['All', 'Active', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === st
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
          <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
            <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No anomalies found matching your filter</p>
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
                    ? 'bg-slate-50 border-slate-200 opacity-70'
                    : 'bg-rose-50/70 border-rose-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${
                      isResolved
                        ? 'bg-slate-100 border-slate-200 text-slate-500'
                        : 'bg-rose-100 border-rose-300 text-rose-600'
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
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          alert.severity === 'Critical'
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : alert.severity === 'High'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {alert.severity || 'High'}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {alert.building || 'Campus'}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-slate-900 mt-1">
                        {alert.message}
                      </p>

                      <p className="text-xs text-slate-600 mt-1">
                        AI Recommended Action: {alert.suggestedAction || 'Check HVAC schedules and reduce excess load.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onSelectAlert(alert)}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all border border-slate-200 shadow-sm"
                    >
                      Inspect
                    </button>
                    {!isResolved && (
                      <button
                        onClick={() => onResolveAlert(alert.id || alert._id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
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
