const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./dbConfig/config');
const jwt = require('jsonwebtoken');
const sign = config.sign;

// Recursos
const usuarios = require('./resources/usuariosRepo')

server.listen(3000, (req, res) => {
  console.log(`servidor iniciado en puerto ${config.port}`);
});

server.use(cors());
server.use(bodyParser.json());

// login
server.post('/login', async(req,res)=>{
  const {email, contrasena} = req.body
  try{
      const respuesta = await usuarios.login(email,contrasena)
      res.status(200).json(respuesta[0])
  }catch(e){
      console.log(e)
  }
})