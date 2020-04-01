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

// Obtener listado de usuarios
server.get('/usuarios',usuarios.validarAdmin, async(req,res)=>{
  try{
    const listadoUsuarios = await usuarios.obtenerUsuarios();
    let listUsuConPedidos = await Promise.all(
      listadoUsuarios.map(async fila=>{
        let id_usuario = fila.id_usuario
        const pedidosDeUsuario = await usuarios.obtenerPedidosDeUsuario(id_usuario)
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
    if(listUsuConPedidos !== undefined){
      return res.status(200).json(listUsuConPedidos)
    }
  }catch(e){
    res.status(500).json({msj: 'Error del servidor'}).end()
  } 
})

//Obtener usuario por id
server.get('/usuarios/:id_usuario',usuarios.validarUser, async(req,res)=>{
  try{
    const {id_usuario} = req.params
    const {user,es_admin} = req.usuario
    const usuarioSelec = await usuarios.obtenerUsuarioPorId(id_usuario);
    if(usuarioSelec[0] === undefined){
      res.status(404).json({msj: 'Usuario inexistente'})
    }else if(usuarioSelec[0].usuario === user || "true" === es_admin){
      let usuarioConPedidos = await usuarios.obtUsuarioConPedidos(id_usuario)
         res.status(200).json(usuarioConPedidos)
    }else{
      res.status(401).json({msj: 'Usuario no autorizado'})
    }
  }catch(e){
    res.status(500).json({msj: 'Error del servidor'}).end()
  } 
})

// Modificar usuario por id
server.put('/usuarios/:id_usuario',usuarios.validarUser, async(req,res)=>{
  const{id_usuario} = req.params;
  //Verificacion de usuario
  const {user} = req.usuario
  const usuarioSelec = await usuarios.obtenerUsuarioPorId(id_usuario);
  if(usuarioSelec[0] === undefined){
    res.status(401).json({msj: 'Usuario inexistente'}).end()
  }else if(usuarioSelec[0].usuario !== user){
    res.status(401).json({msj: 'Usuario no autorizado'}).end()
  }else {
    const{usuario,nombreApellido,email,direccion,telefono,contrasena} = req.body;
    let validacion = usuarios.validarInputUsuario(usuario,nombreApellido,email,direccion,telefono,contrasena)
    //Obteniendo los datos para la modificacion
      if(validacion){
          try{
            const usuarioActualizado = await usuarios.actualizarUsuario(id_usuario,usuario,nombreApellido,email,direccion,telefono,contrasena);
            console.log('esto viene actualizado', usuarioActualizado)
            res.status(200).json(usuarioActualizado[0])
          }catch(e){
              res.status(500).json({msj: 'Error del servidor'}).end()
          }
      }else{
          res.status(400).json({msj: 'Error al ingresar los datos de usuario'})
      }
  }
})

// Eliminar un Usuario
