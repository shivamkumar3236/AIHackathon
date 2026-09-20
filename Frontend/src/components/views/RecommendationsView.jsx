import React, { useState } from 'react';
import { Lightbulb, IndianRupee, CheckCircle2, Clock, Zap, Droplets, Trash2, Sparkles } from 'lucide-react';

export default function RecommendationsView({ recommendations, onStatusChange }) {
  const [items, setItems] = useState(recommendations || []);

  const handleToggle = (id) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const nextStatus = item.actionStatus === 'Implemented' ? 'Pending' : 'Implemented';
        if (onStatusChange) onStatusChange(id, nextStatus);
        return { ...item, actionStatus: nextStatus };
      }
      return item;
    });
    setItems(updated);
  };

  const totalEstimated = items.reduce((acc, cur) => acc + (cur.potentialSavingAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span>AI Energy & Resource Conservation Recommendations</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Intelligent recommendations derived from consumption patterns to reduce campus waste
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <span className="text-slate-300">Total Potential Savings:</span>
          <span className="font-extrabold text-emerald-400 text-sm">
            ₹{totalEstimated.toLocaleString('en-IN')}/mo
          </span>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-3">
        {items.map((rec) => {
          const isImplemented = rec.actionStatus === 'Implemented';

          return (
            <div
              key={rec.id}
              className={`p-5 rounded-2xl border transition-all ${
                isImplemented
                  ? 'ai-glass border-white/[0.06] opacity-70'
                  : 'ai-glass-card hover:border-emerald-500/40 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    rec.resourceType === 'Electricity'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : rec.resourceType === 'Water'
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {rec.resourceType === 'Electricity' ? (
                      <Zap className="w-5 h-5" />
                    ) : rec.resourceType === 'Water' ? (
                      <Droplets className="w-5 h-5" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        rec.impact === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : rec.impact === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}>
                        {rec.impact} Impact
                      </span>
                      <span className="text-xs font-semibold text-slate-300">
                        {rec.building}
                      </span>
                      <span className="text-xs text-slate-500">
                        {rec.resourceType}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white leading-relaxed">
                      {rec.suggestion}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>Potential Saving: {rec.potentialSaving}</span>
                    </div>
                  </div>
                </div>

                {/* Status Toggle Action */}
                <div className="self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleToggle(rec.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isImplemented
                        ? 'bg-white/[0.04] text-emerald-400 border border-emerald-500/40 hover:bg-white/[0.08]'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isImplemented ? 'Implemented' : 'Mark as Applied'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
