const express = require("express");
const router = express.Router();
const db = require("../../database/connection");

router.post("/creation", async (req, res) => {
    const {
      nombre,
      apellido,
      marca,
      modelo,
      tipo,
      año,
      correo,
      numero,
      fecha,
      hora,
      cliente_id,
      sucursal_id,
      servicio_id,
    } = req.body;
  
    const query = `
      INSERT INTO cita (
        nombre, apellido, marca, modelo, tipo, año, correo, numero, fecha, hora, cliente_id, sucursal_id, servicio_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    try {
      const [results] = await db.query(query, [
        nombre,
        apellido,
        marca,
        modelo,
        tipo,
        año,
        correo,
        numero,
        fecha,
        hora,
        cliente_id,
        sucursal_id,
        servicio_id,
      ]);
  
      res.status(201).send({ id: results.insertId });
    } catch (err) {
      console.error("Error al insertar la cita:", err);
      res.status(500).send("Error al insertar la cita");
    }
  });
module.exports = router;