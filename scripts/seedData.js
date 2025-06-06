const axios = require('axios');

// Fix: Ensure proper URL format with protocol and host
const API_BASE = 'http://localhost:5000/api';

const users = [
  { name: 'Alice', email: 'alice@example.com', password: '123456' },
  { name: 'Bob', email: 'bob@example.com', password: '123456' },
  { name: 'Charlie', email: 'charlie@example.com', password: '123456' },
];

const productsByUser = {
  'alice@example.com': [
    { name: 'Teclado mecánico', description: 'Switches azules', price: 80 },
    { name: 'Mouse gamer', description: 'RGB y 16000 DPI', price: 50 },
  ],
  'bob@example.com': [
    { name: 'Monitor 4K', description: '27 pulgadas', price: 300 },
  ],
  'charlie@example.com': [
    { name: 'Silla ergonómica', description: 'Para oficina', price: 200 },
    { name: 'Escritorio ajustable', description: 'Altura regulable', price: 250 },
    { name: 'Lámpara LED', description: 'Con brazo flexible', price: 40 },
  ],
};

(async () => {
  const tokens = {};

  // Registrar usuarios y obtener tokens
  for (const user of users) {
    try {
      // Routes now match /api/user/register and /api/user/login
      const registerResponse = await axios.post(`${API_BASE}/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`Usuario registrado: ${user.email}`, registerResponse.data);
    } catch (err) {
      console.log(`Usuario ya existe: ${user.email}`, err.response?.data);
    }

    try {
      const loginRes = await axios.post(`${API_BASE}/user/login`, {
        email: user.email,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      tokens[user.email] = loginRes.data.token;
      console.log(`Login exitoso: ${user.email}`);
    } catch (err) {
      console.error(`Error en login: ${user.email}`, err.response?.data);
    }
  }

  // Crear productos para cada usuario
  for (const [email, products] of Object.entries(productsByUser)) {
    const token = tokens[email];

    for (const product of products) {
      try {
        // Fix: Update products endpoint
        await axios.post(`${API_BASE}/product/create`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`Producto creado: ${product.name}`);
      } catch (err) {
        console.error(`Error creando producto: ${product.name}`, err.response?.data || err.message);
      }
    }
  }

  console.log('Proceso de población de datos completado.');
})();