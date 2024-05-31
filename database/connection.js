const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Autos64mustang$',
  database: 'mecanico_express'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos con id:', db.threadId);
});


module.exports = db;