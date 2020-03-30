const sequelize = require('../dbConfig/db');
const jwt = require('jsonwebtoken');
const config = require('../dbConfig/config');
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

 function validarEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true
    }return false
}

function validarTel(telefono){
    if(/^\d{10}$/.test(telefono)){
        console.log('entra true')
        return true;
        }console.log('entra false') 
        return false;
}

function validarInputUsuario(usuario,nombreApellido,email,direccion,telefono,contrasena){
    console.log('validando')
    if(usuario && nombreApellido && email && validarEmail(email) && direccion && telefono && validarTel(telefono) && contrasena){
        return true
    } return false
}

async function crearNuevoUsuario(usuario,nombreApellido,email,direccion,telefono,contrasena){
return await sequelize.query('INSERT INTO usuarios VALUES(?,?,?,?,?,?,?,?)',
        {replacements: ['NULL',usuario,nombreApellido,email,direccion,telefono,"false", contrasena]})
        .then(usuario=>{
            let id_usuario = usuario[0];
            return id_usuario? true : false;
        })
}

async function obtenerUsuarios(){
    return await sequelize.query('SELECT * FROM usuarios',
 {type: sequelize.QueryTypes.SELECT})
}
   
module.exports = {
    login,
    validarUser,
    validarAdmin,
    crearNuevoUsuario,
    validarInputUsuario,
    obtenerUsuarios
} 