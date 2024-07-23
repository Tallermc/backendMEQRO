const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Tener activas nuestras conexiones
  connectionLimit: 10, // Conjunto de conexiones activas
  queueLimit: 0, // Linea de espera en las conexiones
  connectTimeout: 10000 //Espera de respuesta de la conexion 10 seg
});



module.exports = pool.promise();