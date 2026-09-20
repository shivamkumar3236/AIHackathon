import React, { useState } from 'react';
import { X, IndianRupee, Sparkles, TrendingDown, Leaf, ShieldCheck } from 'lucide-react';

export default function CostSavingCalculatorModal({ isOpen, onClose }) {
  const [electricity, setElectricity] = useState(3200); // kWh
  const [water, setWater] = useState(48000); // Litres
  const [waste, setWaste] = useState(1200); // kg

  const [elecReduction, setElecReduction] = useState(20); // 20%
  const [waterReduction, setWaterReduction] = useState(15); // 15%
  const [wasteReduction, setWasteReduction] = useState(18); // 18%

  if (!isOpen) return null;

  // Pricing constants (in INR)
  const ELEC_RATE = 8.50; // ₹ / kWh
  const WATER_RATE = 0.05; // ₹ / Litre
  const WASTE_RATE = 15.00; // ₹ / kg

  // Financial calculations
  const elecCurrentCost = electricity * ELEC_RATE;
  const waterCurrentCost = water * WATER_RATE;
  const wasteCurrentCost = waste * WASTE_RATE;
  const totalCurrentCost = elecCurrentCost + waterCurrentCost + wasteCurrentCost;

  const elecSaving = elecCurrentCost * (elecReduction / 100);
  const waterSaving = waterCurrentCost * (waterReduction / 100);
  const wasteSaving = wasteCurrentCost * (wasteReduction / 100);
  const totalSavings = elecSaving + waterSaving + wasteSaving;
  const totalOptimizedCost = totalCurrentCost - totalSavings;

  // Environmental impact (CO2)
  const co2SavedKg = Math.round(
    (electricity * (elecReduction / 100) * 0.82) +
    (water * (waterReduction / 100) * 0.0003) +
    (waste * (wasteReduction / 100) * 0.50)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">
              Campus Cost & Saving Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Interactive financial and carbon footprint simulation
            </p>
          </div>
        </div>

        {/* Impact Summary Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Current Monthly Cost</span>
            <span className="text-xl font-extrabold text-slate-200">
              ₹{Math.round(totalCurrentCost).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
            <span className="text-xs text-emerald-400 block mb-1">Estimated Savings</span>
            <span className="text-xl font-extrabold text-emerald-400">
              ₹{Math.round(totalSavings).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-300 font-semibold block mt-0.5">
              (~{Math.round((totalSavings / totalCurrentCost) * 100)}% reduction)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30">
            <span className="text-xs text-teal-400 block mb-1">CO₂ Emissions Saved</span>
            <span className="text-xl font-extrabold text-teal-300">
              {co2SavedKg} kg
            </span>
            <span className="text-[10px] text-teal-400 block mt-0.5">
              ≈ {Math.round(co2SavedKg / 20)} trees planted / month
            </span>
          </div>
        </div>

        {/* Sliders for Resource Targets */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Adjust Optimization Targets
          </h4>

          {/* Electricity Target */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">Electricity Conservation Goal</span>
              <span className="font-bold text-amber-400">{elecReduction}% (Save ₹{Math.round(elecSaving).toLocaleString('en-IN')})</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={elecReduction}
              onChange={(e) => setElecReduction(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5% (Basic Dimming)</span>
              <span>20% (Recommended)</span>
              <span>40% (Aggressive Smart Grid)</span>
            </div>
          </div>

          {/* Water Target */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">Water Conservation Goal</span>
              <span className="font-bold text-cyan-400">{waterReduction}% (Save ₹{Math.round(waterSaving).toLocaleString('en-IN')})</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={waterReduction}
              onChange={(e) => setWaterReduction(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5% (Flow restrictors)</span>
              <span>15% (Leak detection)</span>
              <span>35% (Greywater recycling)</span>
            </div>
          </div>

          {/* Waste Target */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">Waste Reduction & Composting Goal</span>
              <span className="font-bold text-emerald-400">{wasteReduction}% (Save ₹{Math.round(wasteSaving).toLocaleString('en-IN')})</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={wasteReduction}
              onChange={(e) => setWasteReduction(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5% (Segregation)</span>
              <span>18% (Dining Composting)</span>
              <span>40% (Zero-Waste Protocol)</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all"
          >
            Apply Optimization Goals
          </button>
        </div>
      </div>
    </div>
  );
}
