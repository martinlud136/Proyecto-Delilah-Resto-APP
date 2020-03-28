const options = require('./config')
const Sequelize = require('sequelize');

const connect = new Sequelize(options.dbUrl);

module.exports = connect;