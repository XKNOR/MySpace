const express = require('express');
const router = express.Router();
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
const User = require('./users');


router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    const token = generateToken(newUser);
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        console.log("Campos que fallan:", error.errors.map(e => e.path));
        console.log("Motivo:", error.errors.map(e => e.message));
        return res.status(400).json({ 
            error: "Error de validación", 
            detalles: error.errors.map(e => e.message) 
        });
    }
    console.error("Error completo:", error);
    res.status(400).json({ error: error.message });
}
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const { verifyToken } = require('../utils/auth');

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = verifyToken(token);
    res.json({ id: decoded.id, role: decoded.role });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});


router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = verifyToken(token);
    res.json({ id: decoded.id, role: decoded.role });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router; 