const sequelize = require('../dbConfig/db');
const jwt = require('jsonwebtoken');
const config = require('../dbConfig/config')
const sign = config.sign

const validarUser = (req,res,next)=> {
    const token = req.headers.authorization.split(' ')[1];
    try {
        let decode = jwt.verify(token, sign);
        if(decode){
            req.usuario = decode;
            next();
        }else{
            throw "No permmision";
        }
    } catch (error) {
        res.status(401).json({msj: 'login invalido'})
    }
}

const validarAdmin = (req,res,next)=> {
    const token = req.headers.authorization.split(' ')[1];
    try {
        let decode = jwt.verify(token, sign);
        if(decode.es_admin === "true"){
            
            req.usuario = decode;
            next();
        }else{
            throw "Usuario sin acceso";
        }
    } catch (error) {
        res.status(401).json({msj: 'Usuario no autorizado'})
    }
}



async function login(email,contrasena){
    return await sequelize.query(`SELECT usuario, es_admin FROM usuarios WHERE email = ? AND contrasena = ?`,
 {replacements: [email,contrasena], type: sequelize.QueryTypes.SELECT
 })
 }

   
module.exports = {
    login,
    validarUser,
    validarAdmin
} 