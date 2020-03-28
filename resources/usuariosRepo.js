const sequelize = require('../dbConfig/db')

async function login(email,contrasena){
    return await sequelize.query(`SELECT es_admin FROM usuarios WHERE email = ? AND contrasena = ?`,
 {replacements: [email,contrasena], type: sequelize.QueryTypes.SELECT
 })
 }

   
module.exports = {
    login,
} 