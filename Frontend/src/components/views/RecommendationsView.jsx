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
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span>AI Energy & Resource Conservation Recommendations</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Intelligent recommendations derived from consumption patterns to reduce campus waste
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2 shadow-sm">
          <span className="text-slate-600 font-medium">Total Potential Savings:</span>
          <span className="font-extrabold text-emerald-700 text-sm">
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
                  ? 'bg-slate-50 border-slate-200 opacity-80'
                  : 'bg-white border-slate-200 hover:border-emerald-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    rec.resourceType === 'Electricity'
                      ? 'bg-amber-50 border-amber-200 text-amber-600'
                      : rec.resourceType === 'Water'
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-600'
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
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : rec.impact === 'Medium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {rec.impact} Impact
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {rec.building}
                      </span>
                      <span className="text-xs text-slate-500">
                        {rec.resourceType}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      {rec.suggestion}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-xs font-bold text-emerald-700">
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
                        ? 'bg-slate-100 text-emerald-700 border border-emerald-300 hover:bg-slate-200'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
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
