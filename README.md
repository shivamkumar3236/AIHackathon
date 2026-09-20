# AI-Powered Smart Campus Resource Management System
> **Monitor • Detect • Predict • Recommend • Save**
> A smart web application to track campus resource usage, detect anomalies, predict future consumption, and suggest ways to reduce waste — all powered by **JavaScript AI (No Python Used!)**.

---

## 🏗️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Recharts, Lucide Icons, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM) with automatic high-performance In-Memory fallback
- **AI / Analytics Logic**: Pure JavaScript (Time-series forecasting, rolling threshold anomaly detection, savings heuristic engine)

---

## 📂 Project Structure

```
AI Buildathon/
├── Backend/
│   ├── data/
│   │   └── seedData.js             # 7-day realistic campus telemetry generator
│   ├── models/
│   │   ├── Alert.js                # Anomaly alerts schema
│   │   ├── Prediction.js           # Time-series prediction schema
│   │   ├── Recommendation.js       # Actionable AI recommendations schema
│   │   └── Resource.js             # Telemetry schema (Electricity, Water, Waste)
│   ├── routes/
│   │   └── apiRoutes.js            # REST API endpoints
│   ├── services/
│   │   └── aiEngine.js             # JS AI Engine (Anomaly, Forecast, Savings)
│   ├── .env.example                # Configuration template
│   ├── package.json
│   └── server.js                   # Express server entry point
│
└── Frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── views/
    │   │   │   ├── AlertsView.jsx
    │   │   │   ├── PredictionsView.jsx
    │   │   │   ├── RecommendationsView.jsx
    │   │   │   ├── ResourcesView.jsx
    │   │   │   └── SettingsView.jsx
    │   │   ├── AnomalyBanner.jsx   # Exact match to image banner
    │   │   ├── AnomalyDetailModal.jsx
    │   │   ├── BottomCards.jsx     # Prediction, Recommendation, Savings
    │   │   ├── CostSavingCalculatorModal.jsx
    │   │   ├── Header.jsx
    │   │   ├── MetricCards.jsx     # Electricity 180 kWh, Water 320 L, Waste 50 kg
    │   │   ├── Sidebar.jsx         # Campus Green navigation
    │   │   ├── SimulateDataModal.jsx
    │   │   └── UsageChart.jsx      # 7-day Recharts interactive graph
    │   ├── services/
    │   │   └── api.js              # Fetch client with offline fallback
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 How to Run

### 1. Start Backend Server
```bash
cd Backend
npm install
npm start
```
*Backend runs on `http://localhost:5000`*

### 2. Start Frontend App
```bash
cd Frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | Live summary metrics (Electricity 180 kWh, Water 320 L, Waste 50 kg) |
| `GET` | `/api/resources` | Get all campus telemetry readings |
| `POST` | `/api/resources` | Log telemetry reading (triggers real-time anomaly check) |
| `GET` | `/api/alerts` | Get anomaly alerts |
| `PUT` | `/api/alerts/:id/resolve` | Mark alert as resolved |
| `GET` | `/api/predictions` | Next week consumption forecasts (720 kWh) |
| `GET` | `/api/recommendations` | AI conservation tips & ₹17,000 savings breakdown |
| `GET` | `/api/charts` | 7-day historical usage data formatted for Recharts |
| `POST` | `/api/calculator` | Dynamic cost and CO2 savings simulation |
| `POST` | `/api/seed` | Seed default hackathon scenario |

---

## 🧠 AI / Analytics Logic (JavaScript)

- **Anomaly Detection**:
  - Compares telemetry readings against rolling baseline averages.
  - If `usage > avg * 1.5`, flags a `High/Critical` anomaly (e.g. *Block A electricity usage is 23% higher than normal*).
- **Time-Series Prediction**:
  - Uses 7-day weighted moving average and trend velocity to forecast next week's load (*720 kWh*).
- **Recommendation & Cost Saving Engine**:
  - Pinpoints peak loads and produces targeted conservation measures (*"Reduce AC usage between 2-5 PM in Block A"*).
  - Calculates estimated monetary savings (*₹17,000 / month, ~20% reduction*) and CO2 footprint reduction.
