const express = require('express');
const { swaggerUi, swaggerSpec } = require('./utils/swagger');
const app = express();

// Add middleware for parsing JSON bodies
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes with /api/user prefix
app.use('/api/user', userRoutes);

module.exports = app;