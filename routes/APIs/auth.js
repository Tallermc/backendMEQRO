const express = require('express');
const router = express.Router();
const db = require('../../database/connection');

router.post('/login', (req, res) => {
  const { correo, password } = req.body;
  const query = `SELECT * FROM cliente WHERE correo=?`;
  db.query(query, [correo], (err, result) => {
    if (err) {
      console.log('Error en la base de datos:', err);
      res.status(500).json({ message: 'Error al logear usuario' });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      return;
    }
    const user = result[0];
    // Aquí deberías usar bcrypt.compare para verificar la contraseña
    if (password === user.password) { // Deberías usar bcrypt.compare(password, user.password)
      res.json({
        token: 'fake-jwt-token',
        name: user.nombre,
        email: user.correo
      });
    } else {
      res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  });
});


module.exports = router;