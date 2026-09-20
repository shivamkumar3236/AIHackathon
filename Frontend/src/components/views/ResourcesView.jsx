import React, { useState, useEffect } from 'react';
import { Gauge, Search, Filter, RefreshCw, Zap, Droplets, Trash2 } from 'lucide-react';

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
            <Gauge className="w-5 h-5 text-emerald-400" />
            <span>Campus Resource Telemetry</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time IoT meter readings and historical consumption logs
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold w-fit border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by building or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="All">All Resources</option>
          <option value="Electricity">Electricity (kWh)</option>
          <option value="Water">Water (L)</option>
          <option value="Waste">Waste (kg)</option>
        </select>

        <select
          value={filterBuilding}
          onChange={(e) => setFilterBuilding(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
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
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Building</th>
                <th className="px-4 py-3">Reading Value</th>
                <th className="px-4 py-3">Entered By</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
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
                    <tr key={item._id || item.id || idx} className="hover:bg-slate-800/40 transition-colors">
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
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold text-[10px]">
                            Surge
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[10px]">
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
