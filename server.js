const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root@localhost:3306/restoclase');

server.listen(3000, (req, res) => {
  console.log("Servidor iniciado...");
});

server.use(cors());
server.use(bodyParser.json());