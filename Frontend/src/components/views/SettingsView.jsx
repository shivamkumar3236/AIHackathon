import React, { useState } from 'react';
import { Settings, Save, Server, Database, Cpu, CheckCircle, Sparkles } from 'lucide-react';

export default function SettingsView() {
  const [multiplier, setMultiplier] = useState(1.5);
  const [elecRate, setElecRate] = useState(8.5);
  const [waterRate, setWaterRate] = useState(0.05);
  const [wasteRate, setWasteRate] = useState(15.0);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300">
            <Settings className="w-5 h-5" />
          </div>
          <span>System Settings & Model Parameters</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure AI anomaly triggers, utility tariffs, and campus infrastructure limits
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* AI Parameters */}
        <div className="ai-glass-card rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>AI Anomaly Detection Parameters</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Anomaly Sensitivity Multiplier
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Triggers an alert when consumption exceeds baseline average multiplied by this factor (Default: 1.5x)
            </p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.1"
                min="1.1"
                max="3.0"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-32 bg-black/40 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <span className="text-xs text-slate-400">x normal baseline</span>
            </div>
          </div>
        </div>

        {/* Utility Tariff Rates */}
        <div className="ai-glass-card rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Utility Tariff Rates (INR)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Electricity (₹ / kWh)
              </label>
              <input
                type="number"
                step="0.1"
                value={elecRate}
                onChange={(e) => setElecRate(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Water (₹ / Litre)
              </label>
              <input
                type="number"
                step="0.01"
                value={waterRate}
                onChange={(e) => setWaterRate(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Waste (₹ / kg)
              </label>
              <input
                type="number"
                step="1"
                value={wasteRate}
                onChange={(e) => setWasteRate(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="ai-glass-card rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Deployment & Architecture State</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
              <span className="text-slate-400 block">Frontend</span>
              <span className="font-bold text-white">React.js + Tailwind</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
              <span className="text-slate-400 block">Backend</span>
              <span className="font-bold text-white">Node.js + Express</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
              <span className="text-slate-400 block">AI Logic</span>
              <span className="font-bold text-cyan-400">JavaScript Time-Series</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
              <span className="text-slate-400 block">Database</span>
              <span className="font-bold text-emerald-400">MongoDB / In-Memory</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>

          {saved && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 animate-in fade-in">
              <CheckCircle className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
