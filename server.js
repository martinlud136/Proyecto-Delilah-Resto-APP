const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./dbConfig/config');
const jwt = require('jsonwebtoken');
const sign = config.sign;

// Recursos
const usuarios = require('./resources/usuariosRepo')
const productos = require('./resources/productosRepo')

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
      if(respuesta[0] !== undefined){
        let token = jwt.sign({ user: respuesta[0].usuario, es_admin: respuesta[0].es_admin}, sign);
        return res.status(200).json({token: token})
      }else{
        res.status(401).json({msj: 'Email o contraseña incorrectos'})
      }
  }catch(e){
      res.status(500).json({msj: 'Error del servidor'}).end()
  }
})

// Endpoints PRODUCTOS
// Crear un Producto
server.post('/productos',usuarios.validarAdmin,async(req,res)=>{
  const{nombre,img,precio} = req.body
  try{
    const producto = await productos.crearProducto(nombre,img,precio);
    if(producto[0] !== undefined){
      return res.status(200).json(producto[0])
    }else{
      res.status(400).json({msj: 'Error al ingresar los datos'})
    }
  }catch(e){
      res.status(500).json({msj: 'Error del servidor'}).end()
  }
})

// Obtener listado de productos
server.get('/productos',usuarios.validarUser, async(req,res)=>{
  try{
    const listadoProductos = await productos.obtenerProductos();
    if(listadoProductos !== undefined){
      return res.status(200).json(listadoProductos)
    }else{
      res.status(400).json({msj: 'Error al ingresar los datos'})
    }
  }catch(e){
    res.status(500).json({msj: 'Error del servidor'}).end()
  } 
})

// Obtener producto por su id
server.get('/productos/:id_producto',usuarios.validarUser, async(req,res)=>{
  try{
    const {id_producto} = req.params
    const productoSelec = await productos.obtenerProductoPorId(id_producto);
    if(productoSelec.length > 0){
      return res.status(200).json(productoSelec)
    }else{
      res.status(404).json({msj: 'Producto inexistente'})
    }
  }catch(e){
    res.status(500).json({msj: 'Error del servidor'}).end()
  } 
})

// Actualizar los datos de un producto
server.put('/productos/:id_producto',usuarios.validarAdmin, async(req,res)=>{
  try{
    const {id_producto} = req.params
    const {nombre, img, precio} = req.body
    const productoSelec = await productos.actualizarProductoPorId(id_producto,nombre,img,precio);
    if(productoSelec.length > 0){
      return res.status(200).json(productoSelec)
    }else{
      res.status(404).json({msj: 'Producto inexistente'})
    }
  }catch(e){
    res.status(500).json({msj: 'Error del servidor'}).end()
  } 
})

// Eliminar un producto
server.delete('/productos/:id_producto',usuarios.validarAdmin, async(req,res)=>{
  try{
    const {id_producto} = req.params
    const productoSelec = await productos.eliminarProductoPorId(id_producto);
    if(productoSelec.length > 0){
      return res.status(200).json({msj: 'Producto eliminado con exito'})
    }else{
      res.status(404).json({msj: 'Producto inexistente'})
    }
  }catch(e){
    res.status(500).json({msj: 'Error del servidor'}).end()
  } 
})

// ENDPOINTS USUARIOS
//Crear un nuevo usuario
server.post('/usuarios',async(req,res)=>{
  const{usuario,nombreApellido,email,direccion,telefono,contrasena} = req.body
  let validacion = usuarios.validarInputUsuario(usuario,nombreApellido,email,direccion,telefono,contrasena)
  if(validacion){
    try{
      const nuevoUsuario = await usuarios.crearNuevoUsuario(usuario,nombreApellido,email,direccion,telefono,contrasena);
      if(nuevoUsuario){
        console.log('tengo usuario creado todo ok')
        return res.status(200).json({msj: 'Usuario creado con exito'})
      }else{
        res.status(400).json({msj: 'Error al ingresar los datos'})
      }
    }catch(e){
        res.status(500).json({msj: 'Error del servidor'}).end()
    }
  }else{
    res.status(400).json({msj: 'Error al ingresar los datos de usuario'})
  }
})