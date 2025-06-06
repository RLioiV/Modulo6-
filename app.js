const express = require('express');
const { swaggerUi, swaggerSpec } = require('./utils/swagger');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/user', userRoutes);

module.exports = app;