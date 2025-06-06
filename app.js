const express = require('express');
const app = express();

// Add middleware for parsing JSON bodies
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

// Register routes with /api/user prefix
app.use('/api/user', userRoutes);

module.exports = app;