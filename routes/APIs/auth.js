const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../database/connection");
//Encryption
const saltRounds = 10;


router.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  const query = `SELECT id,nombre, apellido, correo, contrasena, telefono FROM cliente WHERE correo=?`;

  try {
    const [result] = await db.query(query, [correo]);

    if (result.length === 0) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }

    const user = result[0];
    const match = bcrypt.compareSync(password, user.contrasena);

    if (match) {
      console.log("Login exitoso");
      res.json({
        token: user.id,
        name: user.nombre,
        email: user.correo,
        lastName: user.apellido,
        phone: user.telefono,
      });
    } else {
      console.log("Correo o contraseña incorrectos");
      res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }
  } catch (err) {
    console.error("Error en la base de datos:", err);
    res.status(500).json({ message: "Error al logear usuario" });
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password, telefono, nombre, apellido } = req.body;
  const hashedPass = bcrypt.hashSync(password, saltRounds);
  const insert = `INSERT INTO cliente (nombre, apellido, telefono, correo, contrasena) VALUES (?,?,?,?,?)`;

  try {
    const [result] = await db.query(insert, [nombre, apellido, telefono, email, hashedPass]);
    console.log(result);
    res.status(200).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error("Error al registrar al usuario:", err);
    res.status(500).json({ message: "Error al registrar al usuario" });
  }
});

module.exports = router;
