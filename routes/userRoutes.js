const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, verifyToken } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware'); // ✅ Fixed this line

// Rutas con /user como prefijo
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', protect, updateUser);
router.get('/verifytoken', protect, verifyToken);

module.exports = router;