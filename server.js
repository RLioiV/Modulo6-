const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');



// Crear la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer JSON en el body

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Conexión a MongoDB y arranque del servidor
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
