const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

const { swaggerUi, swaggerSpec } = require('./utils/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
    availableEndpoints: {
      root: '/',
      users: '/api/user',
      products: '/api/product',
      documentation: '/api-docs'
    }
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
  });
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});