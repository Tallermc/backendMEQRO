const express = require('express');
const router = express.Router();
const db = require('../database/connection')

router.get('/', (req, res) => {
  res.send('Servidor Express funcionando');
});

router.get('/data', (req, res) => {
  res.json({saludo: 'Hola perro', tarea: 'Lo hiciste ta arriba', message: 13663})
});

module.exports = router;
