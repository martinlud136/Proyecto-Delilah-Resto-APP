const sequelize = require('../dbConfig/db');
const moment = require('moment');

async function calcularTotalPorProducto(productoCantidadArr){
    let[id_producto, cantidad]= productoCantidadArr;
    return await sequelize.query( `SELECT precio * ${cantidad} as resultado FROM productos WHERE id_producto = ?`,
            {replacements: [id_producto]})
            .then(async respuesta =>{
                let total = respuesta[0][0].resultado
                return await total
            })
}


async function crearPedido(formaDePago,productos,id_usuario,totalPedido){
    let productosArr= [];
    let id_pedido = '';
    productos.forEach(e=> productosArr.push([e.id_producto, e.cantidad]))
    let fecha = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('la fecha es: ', fecha)
    return await sequelize.authenticate().then(async()=>{
        const query = `INSERT INTO pedidos (id_pedido, id_usuario, id_estado, id_formaPago, fecha, total)
        VALUES ("NULL", 
                ${id_usuario},
                (SELECT id_estado FROM estado WHERE estado = "nuevo"),
                (SELECT id_formaPago FROM formapago WHERE formapago = "${formaDePago}"),
                "${fecha}",
                ${totalPedido})`;
       return await sequelize.query(query, {raw : true});
    })
    .then(async pedido=>{
        id_pedido = pedido[0]
        productosArr.forEach(e=> e.unshift(pedido[0]))
        return await sequelize.query('INSERT INTO pedidos_productos(id_pedido, id_producto, cantidad) VALUES ? ',
            {replacements: [productosArr]})       
    })
    .then(async respuesta=>{
        return await sequelize.authenticate().then(async()=>{
            const query = `SELECT pedidos.id_pedido,  estado.estado, pedidos.fecha, 
                formapago.formaPago AS formaDePago,
                pedidos.total, pedidos.id_usuario 
                FROM pedidos
                JOIN estado ON estado.id_estado = pedidos.id_estado
                JOIN formapago ON formapago.id_formaPago = pedidos.id_formaPago
                WHERE id_pedido = ${id_pedido}`;
           return await sequelize.query(query, {raw : true});
        })
    })
    ;
}

async function selecionarProductosdePedido(id_pedido){
    return await sequelize.authenticate().then(async()=>{
        const query = `SELECT productos.*, pedidos_productos.cantidad FROM pedidos_productos
        JOIN productos ON pedidos_productos.id_producto = productos.id_producto
        WHERE id_pedido = ${id_pedido}`;
       return await sequelize.query(query, {raw : true});
    })
}

async function obtenerPedidosSinProd(){
    return await sequelize.authenticate().then(async()=>{
        const query = `SELECT pedidos.id_pedido,  estado.estado, pedidos.fecha, 
            formapago.formaPago AS formaDePago,
            pedidos.total, pedidos.id_usuario 
            FROM pedidos
            JOIN estado ON estado.id_estado = pedidos.id_estado
            JOIN formapago ON formapago.id_formaPago = pedidos.id_formaPago`;
       return await sequelize.query(query, {raw : true});
    })
}

module.exports = {
    crearPedido,
    calcularTotalPorProducto,
    selecionarProductosdePedido,
    obtenerPedidosSinProd
}