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

router.post("/myappointments", async(req, res)=>{
  const {token} = req.body;
  if(token){
    try{
      const [results] = await db.query('SELECT * FROM cita WHERE cliente_id = ? AND status != 3',[token]);
      res.status(200).json({results});
    }catch(e){
      console.log('HUBO UN ERROR',e)
      res.status(500).json({message: 'Error en la consulta'});
    }

  }
})  
module.exports = router;