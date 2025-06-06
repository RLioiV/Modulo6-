const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController-backup');
// Comment out the auth middleware for now to isolate the issue
// const { protect } = require('../middlewares/authMiddleware');

// Remove protect middleware temporarily
router.post('/create', productController.createProduct);
router.get('/readall', productController.getAllProducts);
router.get('/readone/:id', productController.getProductById);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;