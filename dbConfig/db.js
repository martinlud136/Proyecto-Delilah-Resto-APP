const options = require('./config')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(options.dbUrl);

module.exports = sequelize;