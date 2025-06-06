const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, verifyToken } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

// Registro
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Actualizar perfil (protegido)
router.put('/update', protect, updateUser);

// Verificar token (protegido)
router.get('/verifytoken', protect, verifyToken);

module.exports = router;
