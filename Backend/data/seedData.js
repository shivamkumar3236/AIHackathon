/**
 * Realistic Sample Data & Seeding Utility
 * Provides 7-day campus consumption data, active anomalies, and initial predictions
 */

function generateSampleTelemetry() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const now = new Date();

  // Electricity 7 days history leading up to 180 kWh spike on Sun/Today
  // Graph in preview shows: Mon ~110, Tue ~180, Wed ~120, Thu ~210, Fri ~250, Sat ~310, Sun ~340 (or 180 today)
  const electricityGraph = [
    { day: 'Mon', value: 120, building: 'Block A' },
    { day: 'Tue', value: 190, building: 'Block A' },
    { day: 'Wed', value: 140, building: 'Block A' },
    { day: 'Thu', value: 230, building: 'Block A' },
    { day: 'Fri', value: 270, building: 'Block A' },
    { day: 'Sat', value: 310, building: 'Block A' },
    { day: 'Sun', value: 180, building: 'Block A' } // Current 180 kWh (+23% spike)
  ];

  const waterGraph = [
    { day: 'Mon', value: 410, building: 'Campus' },
    { day: 'Tue', value: 380, building: 'Campus' },
    { day: 'Wed', value: 390, building: 'Campus' },
    { day: 'Thu', value: 350, building: 'Campus' },
    { day: 'Fri', value: 360, building: 'Campus' },
    { day: 'Sat', value: 340, building: 'Campus' },
    { day: 'Sun', value: 320, building: 'Campus' } // Current 320 L (-8% vs normal)
  ];

  const wasteGraph = [
    { day: 'Mon', value: 42, building: 'Campus' },
    { day: 'Tue', value: 45, building: 'Campus' },
    { day: 'Wed', value: 48, building: 'Campus' },
    { day: 'Thu', value: 44, building: 'Campus' },
    { day: 'Fri', value: 52, building: 'Campus' },
    { day: 'Sat', value: 55, building: 'Campus' },
    { day: 'Sun', value: 50, building: 'Campus' } // Current 50 kg (+12% vs normal)
  ];

  const resources = [];

  // Generate date-stamped records
  days.forEach((day, index) => {
    const timestamp = new Date(now.getTime() - (6 - index) * 24 * 60 * 60 * 1000);

    resources.push({
      id: `elec-${index}`,
      resourceType: 'Electricity',
      value: electricityGraph[index].value,
      unit: 'kWh',
      building: electricityGraph[index].building,
      day: day,
      timestamp,
      submittedBy: {
        name: index === 6 ? 'Sneha Verma' : 'Campus Smart Meter',
        role: index === 6 ? 'Block Supervisor' : 'Automated IoT',
        email: index === 6 ? 'sneha@campus.edu' : 'meter-elec@campus.edu'
      }
    });

    resources.push({
      id: `water-${index}`,
      resourceType: 'Water',
      value: waterGraph[index].value,
      unit: 'L',
      building: waterGraph[index].building,
      day: day,
      timestamp,
      submittedBy: {
        name: 'Amit Patel',
        role: 'Facility Manager',
        email: 'amit@campus.edu'
      }
    });

    resources.push({
      id: `waste-${index}`,
      resourceType: 'Waste',
      value: wasteGraph[index].value,
      unit: 'kg',
      building: wasteGraph[index].building,
      day: day,
      timestamp,
      submittedBy: {
        name: 'Dr. Rajesh Sharma',
        role: 'Campus Admin',
        email: 'admin@campus.edu'
      }
    });
  });

  return {
    resources,
    electricityGraph,
    waterGraph,
    wasteGraph
  };
}

module.exports = { generateSampleTelemetry };
