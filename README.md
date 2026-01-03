# Server-Monitoring-with-Grafana-Prometheus-and-Loki

# 🚀 Production-Grade Node.js Observability Lab
### (Prometheus, Grafana, & Loki)

This project demonstrates a high-standard observability stack for a Node.js/TypeScript application. It implements the **RED Method** (Requests, Errors, and Duration) to provide deep insights into application health and performance—meeting the engineering standards expected at companies like Google.

---

## 📖 1. The Core Architecture (The "Why")

In professional Site Reliability Engineering (SRE), monitoring is split into distinct pillars. This project implements:

1.  **Metrics (Prometheus):** Numerical data over time. Used to track **Latency** (How slow?) and **Traffic** (Request rates).
2.  **Logs (Loki):** Structured textual data. Used to track **Errors** (Why did it fail?) and granular event details via Winston.
3.  **Visualization (Grafana):** The "Single Pane of Glass." It connects to both Prometheus and Loki to correlate a metric spike (e.g., 500 errors) with the exact log line causing it.

---

## 📁 2. Project File Structure

```text
.
├── src/
│   ├── index.ts          # Express Server & Chaos Lab Routes
│   ├── middleware/
│   │   └── observe.ts    # Global Performance Interceptor
│   └── utils/
│       └── monitor.ts    # Winston (Loki) & Prometheus Config
├── docker-compose.yml    # Infrastructure (Grafana, Loki, Prometheus)
├── prometheus.yml        # Prometheus Scrape Configuration
├── package.json          # Dependencies & Scripts
├── tsconfig.json         # TypeScript Configuration
└── README.md             # This file

🛠️ 3. Installation & Setup
Step 1: Initialize the Project
Run the following commands in your terminal to install the observability stack:

Bash

# Install core dependencies
npm install express prom-client winston winston-loki

# Install development dependencies
npm install --save-dev typescript ts-node nodemon @types/express @types/node
Step 2: Configure TypeScript
Ensure your tsconfig.json is set up for modern Node.js:

JSON

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
🚀 4. How to Run (Detailed Instructions)
A. Start the Monitoring Stack (Docker)
Ensure Docker Desktop is running. In your terminal, run:

Bash

docker compose up -d
This pulls and starts Prometheus (Port 9090), Loki (Port 3100), and Grafana (Port 3001).

B. Start the Node.js Server
Open a new terminal window and run:

Bash

npm start
You should see: "Server monitoring active on port 3000".

C. Configure Grafana Data Sources
Open your browser to: http://localhost:3001

Login: Username: admin | Password: admin (Click skip on password change).

Add Prometheus:

Navigate to Connections -> Data Sources -> Add data source.

Select Prometheus.

URL: http://prometheus:9090

Click Save & Test.

Add Loki:

Navigate to Data Sources -> Add data source.

Select Loki.

URL: http://loki:3100

Click Save & Test.

🧪 5. Testing the "Chaos" APIs
To generate data for your dashboards, visit these endpoints in your browser multiple times:

Fast API (/api/fast): Baseline healthy traffic.

Slow API (/api/slow): Simulates random latency between 1-3 seconds.

Error API (/api/error): Forces a 500 Internal Server Error to test log aggregation.

How to Visualize:
Metrics: In Grafana Explore, select Prometheus and query http_requests_total.

Logs: In Grafana Explore, select Loki and query {app="monitoring-lab"}.