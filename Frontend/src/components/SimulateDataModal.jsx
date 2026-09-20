import React, { useState } from 'react';
import { X, Zap, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { addResource } from '../services/api';

export default function SimulateDataModal({ isOpen, onClose, onDataAdded, currentUser }) {
  const [resourceType, setResourceType] = useState('Electricity');
  const [building, setBuilding] = useState(currentUser?.assignedBuilding && currentUser.assignedBuilding !== 'Campus-wide' ? currentUser.assignedBuilding : 'Block A');
  const [value, setValue] = useState(250);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResultMessage(null);

    try {
      const payload = {
        resourceType,
        building,
        value: Number(value),
        unit: resourceType === 'Electricity' ? 'kWh' : resourceType === 'Water' ? 'L' : 'kg',
        timestamp: new Date().toISOString(),
        submittedBy: currentUser ? {
          name: currentUser.name,
          role: currentUser.role,
          email: currentUser.email
        } : {
          name: 'Campus Staff (Guest)',
          role: 'Operator',
          email: 'guest@campus.edu'
        }
      };

      const res = await addResource(payload);
      if (res.isAnomaly || (res.anomaliesDetected && res.anomaliesDetected.length > 0)) {
        const det = res.details || (res.anomaliesDetected ? res.anomaliesDetected[0] : {});
        setResultMessage({
          type: 'anomaly',
          text: `⚠️ Anomaly Triggered! ${building} ${resourceType} (${value} ${payload.unit}) is ${det.percentageDiff}% higher than baseline (${det.baselineAvg || 'normal'} ${payload.unit}). Alert created!`
        });
      } else {
        const det = res.details || {};
        setResultMessage({
          type: 'success',
          text: `✅ Normal Reading! ${value} ${payload.unit} is within normal baseline (${det.baselineAvg || (resourceType === 'Water' ? 348 : resourceType === 'Electricity' ? 146 : 45)} ${payload.unit}). No anomaly.`
        });
      }

      if (onDataAdded) onDataAdded();
    } catch (err) {
      setResultMessage({
        type: 'error',
        text: 'Failed to record telemetry. Check backend connection.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Simulate Telemetry Spike</h3>
            <p className="text-xs text-slate-400">Test AI anomaly detection engine live</p>
          </div>
        </div>

        {currentUser && (
          <div className="mb-4 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
            <span className="text-slate-300">Data Entry Attributed To:</span>
            <span className="font-bold text-emerald-400">{currentUser.name} ({currentUser.role})</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Resource Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Resource Type
            </label>
            <select
              value={resourceType}
              onChange={(e) => {
                setResourceType(e.target.value);
                if (e.target.value === 'Electricity') setValue(250);
                if (e.target.value === 'Water') setValue(600);
                if (e.target.value === 'Waste') setValue(90);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Electricity">Electricity (kWh)</option>
              <option value="Water">Water (L)</option>
              <option value="Waste">Waste (kg)</option>
            </select>
          </div>

          {/* Building */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Campus Building
            </label>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Block A">Block A (Lecture Halls)</option>
              <option value="Block B">Block B (Laboratories)</option>
              <option value="Library">Library</option>
              <option value="Hostel 1">Hostel 1</option>
              <option value="Hostel 2">Hostel 2</option>
              <option value="Cafeteria">Cafeteria</option>
            </select>
          </div>

          {/* Reading Value */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Simulated Reading Value
              </label>
              <span className="text-[10px] text-amber-400 font-bold">
                (Baseline normal: {resourceType === 'Electricity' ? '146 kWh' : resourceType === 'Water' ? '348 L' : '45 kg'})
              </span>
            </div>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {resultMessage && (
            <div className={`p-3 rounded-xl border text-xs ${
              resultMessage.type === 'anomaly'
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                : resultMessage.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/40 border-red-500/40 text-red-300'
            }`}>
              {resultMessage.text}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
              <span>Submit Telemetry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
