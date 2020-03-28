const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./dbConfig/config')

server.listen(3000, (req, res) => {
  console.log(`servidor iniciado en puerto ${config.port}`);
});

server.use(cors());
server.use(bodyParser.json());