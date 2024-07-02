const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../database/connection");

router.get("/data", (req, res) => {
  res.json({
    saludo: "Hola papito que ondaaa",
    tarea: "Lo hiciste ta arriba",
    message: 13663,
  });
});

router.get("/", (req,res)=>{
  res.json({
    comment: "Hi! There"
  });
});

module.exports = router;
