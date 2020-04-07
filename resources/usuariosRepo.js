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
    try {
        const token = req.headers.authorization.split(' ')[1];
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
    return await sequelize.query(`SELECT usuario, es_admin, id_usuario FROM usuarios WHERE email = ? AND contrasena = ?`,
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
        return true;
        } 
        return false;
}

function validarInputUsuario(usuario,nombreApellido,email,direccion,telefono,contrasena){
    if(usuario && nombreApellido && email && validarEmail(email) && direccion && telefono && validarTel(telefono) && contrasena){
        return true
    } return false
}

async function crearNuevoUsuario(usuario,nombreApellido,email,direccion,telefono,contrasena){
    return await sequelize.query('INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES(?,?,?,?,?,?,?)',
        {replacements: [usuario,nombreApellido,email,direccion,telefono,"false", contrasena]})
        .then(usuario=>{
            let id_usuario = usuario[0];
            return id_usuario? true : false;
        })
}

async function crearNuevoUsuarioadmin(usuario,nombreApellido,email,direccion,telefono,contrasena){
    return await sequelize.query('INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES(?,?,?,?,?,?,?)',
        {replacements: [usuario,nombreApellido,email,direccion,telefono,"true", contrasena]})
        .then(usuario=>{
            let id_usuario = usuario[0];
            return id_usuario? true : false;
        })
}

async function obtenerPedidosDeUsuario(id_usuario){
    return await sequelize.query('SELECT pedidos.id_pedido FROM pedidos WHERE id_usuario = ?',
        {replacements: [id_usuario], type: sequelize.QueryTypes.SELECT})
}

async function obtenerUsuarios(){
    return await sequelize.query('SELECT * FROM usuarios',
        {type: sequelize.QueryTypes.SELECT})
}

async function obtenerUsuarioPorId(id_usuario){
    return await sequelize.query('SELECT * FROM usuarios WHERE id_usuario = ?',
        {replacements: [id_usuario], type: sequelize.QueryTypes.SELECT})
}

async function actualizarUsuario(id_usuario,usuario,nombreApellido,email,direccion,telefono,contrasena){
    return await sequelize.query(`UPDATE usuarios SET 
                id_usuario = ${id_usuario},
                usuario = "${usuario}",
                nombreApellido = "${nombreApellido}",
                email = "${email}",
                direccion= "${direccion}",
                telefono = ${telefono},
                contrasena = "${contrasena}" WHERE usuarios.id_usuario = ?`,
        {replacements: [id_usuario]})
        .then(async respuesta=>{
             return await sequelize.query('SELECT * FROM usuarios WHERE id_usuario = ?',
                {replacements: [id_usuario], type: sequelize.QueryTypes.SELECT})
        })
        .then( async usuarioActualizado=>{
            const usuarioConPedidos = Promise.all(
                usuarioActualizado.map(async fila=>{
                  const pedidosDeUsuario = obtenerPedidosDeUsuario(id_usuario)
                  let pedidoInt = [];
                  if(pedidosDeUsuario.length>0){
                      for(let i of pedidosDeUsuario){
                        pedidoInt.push(i.id_pedido)
                      }
                  }
                  fila.pedidos = pedidoInt
                  return fila
                })
              )
              return await usuarioConPedidos
        })
}

async function obtUsuarioConPedidos(id_usuario){
    return await obtenerUsuarioPorId(id_usuario)
                .then(async usuario=>{
                    const usuarioConPedidos = await Promise.all(
                        usuario.map(async fila=>{
                          const pedidosDeUsuario = await obtenerPedidosDeUsuario(id_usuario)
                          let pedidoInt = [];
                          if(pedidosDeUsuario.length>0){
                              for(let i of pedidosDeUsuario){
                                pedidoInt.push(i.id_pedido)
                              }
                          }
                          fila.pedidos = pedidoInt
                          return fila
                        })
                      )
                      return await usuarioConPedidos
                })
}

async function eliminarUsuario(id_usuario){
    return await sequelize.query('DELETE FROM usuarios WHERE id_usuario = ?',
        {replacements: [id_usuario]})
}
   
module.exports = {
    login,
    validarUser,
    validarAdmin,
    crearNuevoUsuario,
    crearNuevoUsuarioadmin,
    validarInputUsuario,
    obtenerPedidosDeUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    obtUsuarioConPedidos,
    eliminarUsuario
} 