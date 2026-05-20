const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'clave_de_respaldo_por_si_el_env_falla';

const User = require('../routes/users');

// Generar token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET, 
    { expiresIn: '1h' }
  );
};

// Verificar token JWT
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// Hashear contraseña
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Comparar contraseña
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };