import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import UsageChart from './components/UsageChart';
import AnomalyBanner from './components/AnomalyBanner';
import BottomCards from './components/BottomCards';
import AnomalyDetailModal from './components/AnomalyDetailModal';
import CostSavingCalculatorModal from './components/CostSavingCalculatorModal';
import SimulateDataModal from './components/SimulateDataModal';
import AuthModal from './components/AuthModal';
import AiVideoShortsCard from './components/AiVideoShortsCard';

import ResourcesView from './components/views/ResourcesView';
import AlertsView from './components/views/AlertsView';
import PredictionsView from './components/views/PredictionsView';
import RecommendationsView from './components/views/RecommendationsView';
import SettingsView from './components/views/SettingsView';

import {
  fetchStats,
  fetchCharts,
  fetchAlerts,
  fetchPredictions,
  fetchRecommendations,
  resolveAlert,
  seedDatabase,
  getStoredUser,
  clearUserSession
} from './services/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser() || {
    name: 'Sneha Verma',
    email: 'sneha@campus.edu',
    role: 'Block Supervisor',
    assignedBuilding: 'Block A'
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  // Modals state
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  const handleLogout = () => {
    clearUserSession();
    setCurrentUser(null);
  };

  const loadAllData = async () => {
    try {
      const [s, c, a, p, r] = await Promise.all([
        fetchStats(),
        fetchCharts(),
        fetchAlerts(),
        fetchPredictions(),
        fetchRecommendations()
      ]);
      setStats(s);
      setChartData(c);
      setAlerts(a);
      setPredictions(p);
      setRecommendations(r);
    } catch (err) {
      console.warn('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleResolveAlert = async (id) => {
    try {
      await resolveAlert(id || 'alert-elec-default');
    } catch (e) {
      console.warn('API resolve error:', e);
    }
    setAlerts(prev => {
      if (!prev || prev.length === 0) {
        return [{
          id: id || 'alert-elec-default',
          resourceType: 'Electricity',
          building: 'Block A',
          message: 'Block A electricity usage is 23% higher than normal.',
          severity: 'High',
          resolved: true,
          resolvedAt: new Date()
        }];
      }
      return prev.map(a => {
        if (!id || a.id === id || a._id === id || a.id === 'alert-elec-default') {
          return { ...a, resolved: true, resolvedAt: new Date() };
        }
        return a;
      });
    });
    setSelectedAlert(prev => prev ? { ...prev, resolved: true } : null);
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      await loadAllData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSeeding(false);
    }
  };

  const activeAlerts = alerts.filter(a => !a.resolved);
  const featuredAlert = activeAlerts.length > 0 
    ? activeAlerts[0] 
    : (alerts.length > 0 ? alerts[0] : { id: 'alert-elec-default', resolved: false });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* Horizontal Top Navigation Bar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'calculator') {
            setIsCalculatorOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        alertCount={activeAlerts.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Header
          onOpenSimulate={() => setIsSimulateOpen(true)}
          onSeedData={handleSeed}
          isSeeding={isSeeding}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
        />

        {/* Dynamic View Rendering */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top 3 Metric Cards */}
            <MetricCards stats={stats} />

            {/* Middle Row: 7 Days Usage Chart + Anomaly Detected Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <UsageChart chartData={chartData} />
              </div>
              <div className="lg:col-span-1">
                <AnomalyBanner
                  alert={featuredAlert}
                  onViewDetails={(a) => setSelectedAlert(a)}
                />
              </div>
            </div>

            {/* Campus AI Video Shorts & IoT Video Reel Section */}
            <AiVideoShortsCard />

            {/* Bottom 3 Cards: Prediction, AI Recommendation, Estimated Saving */}
            <BottomCards
              stats={stats}
              onOpenCalculator={() => setIsCalculatorOpen(true)}
            />
          </div>
        )}

        {activeTab === 'resources' && <ResourcesView />}

        {activeTab === 'alerts' && (
          <AlertsView
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
            onSelectAlert={(a) => setSelectedAlert(a)}
          />
        )}

        {activeTab === 'predictions' && (
          <PredictionsView predictions={predictions} />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsView
            recommendations={recommendations}
            onStatusChange={(id, status) => {
              setRecommendations(prev =>
                prev.map(r => r.id === id ? { ...r, actionStatus: status } : r)
              );
            }}
          />
        )}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Modals */}
      <AnomalyDetailModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onResolve={handleResolveAlert}
      />

      <CostSavingCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <SimulateDataModal
        isOpen={isSimulateOpen}
        onClose={() => setIsSimulateOpen(false)}
        onDataAdded={loadAllData}
        currentUser={currentUser}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => setCurrentUser(u)}
      />
    </div>
  );
}
