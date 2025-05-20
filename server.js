const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const settingsRoutes = require('./routes/settings');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const servicesRoutes = require('./routes/services');
const stockinRoutes = require('./routes/stockin');
const stockoutRoutes = require('./routes/stockout');
const reportRoutes = require('./routes/report');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/login', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/stockin', stockinRoutes);
app.use('/api/stockout', stockoutRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reminders', require('./routes/reminders'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});