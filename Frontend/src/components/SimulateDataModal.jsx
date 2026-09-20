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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Simulate Telemetry Spike</h3>
            <p className="text-xs text-slate-500">Test AI anomaly detection engine live</p>
          </div>
        </div>

        {currentUser && (
          <div className="mb-4 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Data Entry Attributed To:</span>
            <span className="font-bold text-emerald-800">{currentUser.name} ({currentUser.role})</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Resource Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="Electricity">Electricity (kWh)</option>
              <option value="Water">Water (L)</option>
              <option value="Waste">Waste (kg)</option>
            </select>
          </div>

          {/* Building */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Campus Building
            </label>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
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
              <label className="text-xs font-semibold text-slate-700">
                Simulated Reading Value
              </label>
              <span className="text-[10px] text-amber-700 font-bold">
                (Baseline normal: {resourceType === 'Electricity' ? '146 kWh' : resourceType === 'Water' ? '348 L' : '45 kg'})
              </span>
            </div>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          {resultMessage && (
            <div className={`p-3 rounded-xl border text-xs ${
              resultMessage.type === 'anomaly'
                ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                : resultMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {resultMessage.text}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
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
