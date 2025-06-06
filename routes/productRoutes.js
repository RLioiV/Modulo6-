const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

// Ruta para crear un producto (requiere autenticación)
router.post('/create', protect, productController.createProduct);

// Obtener todos los productos del usuario autenticado
router.get('/readall', protect, productController.getAllProducts);

// Obtener un producto por ID (solo si pertenece al usuario autenticado)
router.get('/readone/:id', protect, productController.getProductById);

// Actualizar un producto por ID (solo si pertenece al usuario autenticado)
router.put('/update/:id', protect, productController.updateProduct);

// Eliminar un producto por ID (solo si pertenece al usuario autenticado)
router.delete('/delete/:id', protect, productController.deleteProduct);

module.exports = router;

app.use('/api/products', require('./routes/productRoutes'));