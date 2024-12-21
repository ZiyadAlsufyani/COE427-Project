const express = require('express');
const path = require('path');
const rti = require('rticonnextdds-connector');
const app = express();
const configFile = path.join(__dirname, 'QSystem.xml');

const orderTracking = new Map();

const metrics = {
  queueLength: 0,
  averageServiceTime: 0,
  averageWaitTime: 0,
  ordersByStatus: {
    preparing: 0,
    ready: 0,
    completed: 0
  },
  orderHistory: []
};

const run = async () => {
  const connector = new rti.Connector('MonitoringDashboardParticipantLibrary::MonitoringDashboardSubParticipant', configFile);
  const input = connector.getInput('MonitoringDashboardSubscriber::MonitoringDashboardReader');

  try {
    while (true) {
      await input.wait();
      input.take();
      for (const sample of input.samples.validDataIter) {
        const data = sample.getJson();
        updateMetrics(data);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

function updateMetrics(orderData) {
  const { orderNum, fromDevice, toDevice } = orderData;
  
  console.log(orderNum, fromDevice, toDevice);
  // Initialize order tracking if new order
  if (!orderTracking.has(orderNum)) {
    orderTracking.set(orderNum, {
      createdTime: Date.now(),
      status: 'created'
    });
  }

  const order = orderTracking.get(orderNum);

  // Handle status transitions based on device interactions
  let newStatus;
  if (fromDevice === 'home' && toDevice === 'display') {
    newStatus = 'preparing';
    order.preparingTime = Date.now();
  } else if (fromDevice === 'kitchen' && toDevice === 'display') {
    newStatus = 'ready';
    order.readyTime = Date.now();
  } else if (fromDevice === 'orderTermination' && toDevice === 'display') {
    newStatus = 'completed';
    order.completedTime = Date.now();
  }

  // Update status counts
  if (order.status !== newStatus) {
    metrics.ordersByStatus[order.status]--;
    metrics.ordersByStatus[newStatus]++;
    order.status = newStatus;
  }

  // Update queue metrics
  metrics.queueLength = metrics.ordersByStatus.preparing + metrics.ordersByStatus.ready;

  // Calculate timing metrics for completed orders
  if (newStatus === 'completed') {
    const waitTime = (order.preparingTime - order.createdTime) / 1000 / 60;
    const serviceTime = (order.completedTime - order.preparingTime) / 1000 / 60;
    
    metrics.averageWaitTime = updateRollingAverage(metrics.averageWaitTime, waitTime);
    metrics.averageServiceTime = updateRollingAverage(metrics.averageServiceTime, serviceTime);
    
    // Clean up tracking for completed order
    orderTracking.delete(orderNum);
  }

  // Update history
  metrics.orderHistory.push({
    timestamp: new Date().toISOString(),
    queueLength: metrics.queueLength,
    orderStatus: newStatus
  });

  // Maintain history length
  if (metrics.orderHistory.length > 50) {
    metrics.orderHistory.shift();
  }
}

function updateRollingAverage(currentAvg, newValue, weight = 0.1) {
  if (currentAvg === 0) return newValue;
  return currentAvg * (1 - weight) + newValue * weight;
}

app.get('/api/metrics', (req, res) => {
  res.json(metrics);
});

app.listen(5004, async () => {
  console.log('Monitoring dashboard server started on port 5004');
  await run();
});