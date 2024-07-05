const express = require('express');
const router = express.Router();
const db = require('../../database/connection');

router.get('/services', async(req,res)=>{
    try{
        const [results] = await db.query('SELECT * FROM servicio');
        res.status(200).json({results});
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'No hay servicios disponibles'})
    }

})

module.exports = router;