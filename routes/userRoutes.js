const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Registro
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Actualizar perfil (protegido)
router.put('/update', protect, updateUser);

module.exports = router;
