import React, { useState, useEffect } from 'react';
import { Gauge, Search, Filter, RefreshCw, Zap, Droplets, Trash2, Sparkles } from 'lucide-react';

export default function ResourcesView() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [filterBuilding, setFilterBuilding] = useState('All');
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/resources');
      const json = await res.json();
      if (json.data) setResources(json.data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = resources.filter(r => {
    const matchesType = filterType === 'All' || r.resourceType.toLowerCase() === filterType.toLowerCase();
    const matchesBuilding = filterBuilding === 'All' || r.building.toLowerCase() === filterBuilding.toLowerCase();
    const matchesSearch = r.building.toLowerCase().includes(search.toLowerCase()) ||
                          r.resourceType.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesBuilding && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
              <Gauge className="w-5 h-5" />
            </div>
            <span>Campus Resource Telemetry</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time IoT meter readings and historical audit trail
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-semibold w-fit border border-white/[0.08] transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="ai-glass-card rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by building or resource..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-black/40 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
        >
          <option value="All">All Resources</option>
          <option value="Electricity">Electricity (kWh)</option>
          <option value="Water">Water (L)</option>
          <option value="Waste">Waste (kg)</option>
        </select>

        <select
          value={filterBuilding}
          onChange={(e) => setFilterBuilding(e.target.value)}
          className="bg-black/40 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
        >
          <option value="All">All Buildings</option>
          <option value="Block A">Block A</option>
          <option value="Block B">Block B</option>
          <option value="Library">Library</option>
          <option value="Hostel 1">Hostel 1</option>
          <option value="Cafeteria">Cafeteria</option>
        </select>
      </div>

      {/* Telemetry Table */}
      <div className="ai-glass-card rounded-2xl overflow-hidden shadow-lg border border-white/[0.08]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 text-slate-400 font-semibold uppercase tracking-wider border-b border-white/[0.06]">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Building</th>
                <th className="px-4 py-3">Reading Value</th>
                <th className="px-4 py-3">Entered By</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">
                    No resource telemetry records found.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const isSpike = item.resourceType === 'Electricity' && item.value > 200;
                  const submitter = item.submittedBy || { name: 'Campus IoT Sensor', role: 'System' };
                  return (
                    <tr key={item._id || item.id || idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-semibold flex items-center gap-2">
                        {item.resourceType === 'Electricity' ? (
                          <Zap className="w-4 h-4 text-amber-400" />
                        ) : item.resourceType === 'Water' ? (
                          <Droplets className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-emerald-400" />
                        )}
                        <span>{item.resourceType}</span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-200">{item.building}</td>
                      <td className="px-4 py-3 font-bold text-white">
                        {item.value} <span className="text-slate-400 font-normal">{item.unit}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-200">{submitter.name}</span>
                          <span className="text-[10px] text-emerald-400 font-medium">{submitter.role}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {isSpike ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[10px] shadow-[0_0_10px_rgba(244,63,94,0.25)]">
                            Surge
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold text-[10px]">
                            Normal
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
