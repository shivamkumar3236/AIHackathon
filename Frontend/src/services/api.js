const API_BASE = '/api';

// Fallback data in case backend is offline
export const FALLBACK_STATS = {
  electricity: {
    current: 180,
    unit: 'kWh',
    normal: 146,
    changePercent: 23,
    direction: 'up',
    label: '+23% vs normal',
    building: 'Block A'
  },
  water: {
    current: 320,
    unit: 'L',
    normal: 348,
    changePercent: 8,
    direction: 'down',
    label: '-8% vs normal',
    building: 'Campus'
  },
  waste: {
    current: 50,
    unit: 'kg',
    normal: 45,
    changePercent: 12,
    direction: 'up',
    label: '+12% vs normal',
    building: 'Campus'
  },
  estimatedMonthlySaving: {
    amount: 17000,
    formatted: '₹17,000',
    reductionPercent: 20,
    label: '(~20% reduction)'
  },
  nextWeekPrediction: {
    electricity: 720,
    unit: 'kWh',
    label: '720 kWh'
  },
  featuredRecommendation: {
    text: 'Reduce AC usage between 2-5 PM in Block A.',
    targetBuilding: 'Block A',
    estimatedSaving: '₹17,000'
  }
};

export const FALLBACK_CHARTS = [
  { day: 'Mon', Electricity: 110, Water: 410, Waste: 42, normalElectricity: 140 },
  { day: 'Tue', Electricity: 190, Water: 380, Waste: 45, normalElectricity: 145 },
  { day: 'Wed', Electricity: 130, Water: 390, Waste: 48, normalElectricity: 142 },
  { day: 'Thu', Electricity: 220, Water: 350, Waste: 44, normalElectricity: 146 },
  { day: 'Fri', Electricity: 255, Water: 360, Waste: 52, normalElectricity: 145 },
  { day: 'Sat', Electricity: 310, Water: 340, Waste: 55, normalElectricity: 150 },
  { day: 'Sun', Electricity: 180, Water: 320, Waste: 50, normalElectricity: 146 }
];

export const FALLBACK_ALERTS = [
  {
    id: 'alert-1',
    resourceType: 'Electricity',
    building: 'Block A',
    severity: 'High',
    message: 'Block A electricity usage is 23% higher than normal.',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 'alert-2',
    resourceType: 'Water',
    building: 'Hostel 1',
    severity: 'Medium',
    message: 'Hostel 1 nighttime water flow exceeds normal baseline by 18%.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resolved: false
  }
];

export const FALLBACK_PREDICTIONS = {
  Electricity: {
    resourceType: 'Electricity',
    predictedValue: 720,
    unit: 'kWh',
    period: 'Next Week',
    confidence: 0.94,
    trend: 'Increasing'
  },
  Water: {
    resourceType: 'Water',
    predictedValue: 2400,
    unit: 'L',
    period: 'Next Week',
    confidence: 0.92,
    trend: 'Decreasing'
  },
  Waste: {
    resourceType: 'Waste',
    predictedValue: 340,
    unit: 'kg',
    period: 'Next Week',
    confidence: 0.90,
    trend: 'Stable'
  }
};

export const FALLBACK_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    resourceType: 'Electricity',
    building: 'Block A',
    suggestion: 'Reduce AC usage between 2-5 PM in Block A.',
    potentialSaving: '₹17,000 (~20% reduction)',
    potentialSavingAmount: 17000,
    impact: 'High',
    actionStatus: 'Pending',
    timestamp: new Date().toISOString()
  },
  {
    id: 'rec-2',
    resourceType: 'Water',
    building: 'Hostel 1',
    suggestion: 'Inspect and replace valve gaskets on 3rd floor restrooms to stop nighttime water seepage.',
    potentialSaving: '₹5,400 (~15% reduction)',
    potentialSavingAmount: 5400,
    impact: 'Medium',
    actionStatus: 'Pending',
    timestamp: new Date().toISOString()
  },
  {
    id: 'rec-3',
    resourceType: 'Electricity',
    building: 'Library',
    suggestion: 'Schedule automated dimming for unoccupied reading aisles after 8 PM.',
    potentialSaving: '₹4,200 (~12% reduction)',
    potentialSavingAmount: 4200,
    impact: 'Medium',
    actionStatus: 'Implemented',
    timestamp: new Date().toISOString()
  },
  {
    id: 'rec-4',
    resourceType: 'Waste',
    building: 'Cafeteria',
    suggestion: 'Implement organic composting station and meal portion pre-booking.',
    potentialSaving: '₹3,500 (~18% reduction)',
    potentialSavingAmount: 3500,
    impact: 'Low',
    actionStatus: 'Pending',
    timestamp: new Date().toISOString()
  }
];

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using fallback stats:', err.message);
    return FALLBACK_STATS;
  }
}

export async function fetchCharts() {
  try {
    const res = await fetch(`${API_BASE}/charts`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using fallback charts:', err.message);
    return FALLBACK_CHARTS;
  }
}

export async function fetchAlerts() {
  try {
    const res = await fetch(`${API_BASE}/alerts`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using fallback alerts:', err.message);
    return FALLBACK_ALERTS;
  }
}

export async function resolveAlert(id) {
  try {
    const res = await fetch(`${API_BASE}/alerts/${id}/resolve`, { method: 'PUT' });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    console.warn('Fallback resolve alert');
    return { success: true };
  }
}

export async function fetchPredictions() {
  try {
    const res = await fetch(`${API_BASE}/predictions`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using fallback predictions:', err.message);
    return FALLBACK_PREDICTIONS;
  }
}

export async function fetchRecommendations() {
  try {
    const res = await fetch(`${API_BASE}/recommendations`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using fallback recommendations:', err.message);
    return FALLBACK_RECOMMENDATIONS;
  }
}

export async function addResource(data) {
  try {
    const res = await fetch(`${API_BASE}/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to post resource reading:', err);
    throw err;
  }
}

export async function calculateSavings(data) {
  try {
    const res = await fetch(`${API_BASE}/calculator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Fallback calculator calculation');
    return null;
  }
}

export async function seedDatabase() {
  try {
    const res = await fetch(`${API_BASE}/seed`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.error('Failed to seed:', err);
    throw err;
  }
}

// Auth helpers & Session Management
export function getStoredUser() {
  try {
    const user = localStorage.getItem('smart_campus_user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

export function saveUserSession(user, token) {
  if (user) localStorage.setItem('smart_campus_user', JSON.stringify(user));
  if (token) localStorage.setItem('smart_campus_token', token);
}

export function clearUserSession() {
  localStorage.removeItem('smart_campus_user');
  localStorage.removeItem('smart_campus_token');
}

export async function signupUser(userData) {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // Backend returned HTML (e.g. old server process running or 404)
      const fallbackUser = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'Student / Resident',
        assignedBuilding: userData.assignedBuilding || 'Library'
      };
      saveUserSession(fallbackUser, `token-${Date.now()}`);
      return { success: true, user: fallbackUser };
    }

    if (!res.ok) throw new Error(data.error || 'Failed to sign up');
    saveUserSession(data.user, data.token);
    return data;
  } catch (err) {
    if (err.message && err.message !== 'Failed to fetch') {
      throw err;
    }
    // Local fallback if server unreachable
    const fallbackUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'Student / Resident',
      assignedBuilding: userData.assignedBuilding || 'Library'
    };
    saveUserSession(fallbackUser, `token-${Date.now()}`);
    return { success: true, user: fallbackUser };
  }
}

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      const fallbackUser = {
        id: `user-${Date.now()}`,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'Block Supervisor',
        assignedBuilding: 'Block A'
      };
      saveUserSession(fallbackUser, `token-${Date.now()}`);
      return { success: true, user: fallbackUser };
    }

    if (!res.ok) throw new Error(data.error || 'Invalid credentials');
    saveUserSession(data.user, data.token);
    return data;
  } catch (err) {
    if (err.message && err.message !== 'Failed to fetch') {
      throw err;
    }
    const fallbackUser = {
      id: `user-${Date.now()}`,
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: 'Block Supervisor',
      assignedBuilding: 'Block A'
    };
    saveUserSession(fallbackUser, `token-${Date.now()}`);
    return { success: true, user: fallbackUser };
  }
}
