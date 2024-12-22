import StickyHeader from './StickyHeader';
import '../assets/Dashboard.css';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch('api/metrics');
      const data = await response.json();
      setMetrics(data);
    };

    // Update metrics every 1 seconds
    const intervalId = setInterval(fetchMetrics, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <>
      <StickyHeader title="Dashboard" />
      <div className="dashboard">
        <h1>System Monitoring Dashboard</h1>

        <div className="charts-container">
          {/* Real-time Queue Length */}
          <div className="metric-card">
            <h2>Current Queue Length</h2>
            <LineChart width={600} height={300} data={metrics.orderHistory}>
              <Line
                type="monotone"
                dataKey="queueLength"
                stroke="#8884d8"
                name="Queue Length"
                strokeWidth={2}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>

          {/* Order Status Distribution */}
          <div className="metric-card">
            <h2>Orders by Status</h2>
            <BarChart
              width={600}
              height={300}
              data={[
                {
                  name: 'Orders',
                  Preparing: metrics.ordersByStatus.preparing,
                  Ready: metrics.ordersByStatus.ready,
                  Completed: metrics.ordersByStatus.completed
                }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Preparing" fill="#ffa726" name="Preparing" />
              <Bar dataKey="Ready" fill="#66bb6a" name="Ready" />
              <Bar dataKey="Completed" fill="#42a5f5" name="Completed" />
            </BarChart>
          </div>
        </div>

        {/* Service Time Metrics */}
        <div className="metric-card">
          <h2>Average Times (minutes)</h2>
          <div className="metrics-grid">
            <div>
              <h3>Wait Time</h3>
              <p>{metrics.averageWaitTime.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;