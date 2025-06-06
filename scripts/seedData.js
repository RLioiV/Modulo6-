const axios = require('axios');

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
      await axios.post(`${API_BASE}/users/register`, user);
      console.log(`Usuario registrado: ${user.email}`);
    } catch (err) {
      console.log(`Usuario ya existe: ${user.email}`);
    }

    const loginRes = await axios.post(`${API_BASE}/users/login`, {
      email: user.email,
      password: user.password,
    });

    tokens[user.email] = loginRes.data.token;
    console.log(`Login exitoso: ${user.email}`);
  }

  // Crear productos para cada usuario
  for (const [email, products] of Object.entries(productsByUser)) {
    const token = tokens[email];

    for (const product of products) {
      try {
        await axios.post(`${API_BASE}/products/create`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`Producto creado: ${product.name}`);
      } catch (err) {
        console.error(`Error creando producto: ${product.name}`, err.message);
      }
    }
  }

  console.log('Proceso de población de datos completado.');
})();