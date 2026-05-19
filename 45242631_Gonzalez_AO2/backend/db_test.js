const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    
    console.log('✅ Conectado a MySQL correctamente!');
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log('Usuarios encontrados:', rows.length);
    await connection.end();
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

testConnection();