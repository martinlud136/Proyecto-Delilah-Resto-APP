const sequelize = require('../dbConfig/db')

async function crearProducto(nombre,img,precio){
    return await sequelize.query('INSERT INTO productos VALUES(?,?,?,?)',
            {replacements: ['NULL',nombre,img,precio]})
            .then(async producto=>{
                let id_producto = producto[0];
                return await  sequelize.query('SELECT * FROM productos WHERE id_producto = ?',
                {replacements: [id_producto], type: sequelize.QueryTypes.SELECT})
            })
}

async function obtenerProductos(){
    return await sequelize.query('SELECT * FROM productos',
 {type: sequelize.QueryTypes.SELECT})
}

async function obtenerProductoPorId(id_producto){
    return await sequelize.query('SELECT * FROM productos WHERE id_producto = ?',
 {replacements: [id_producto], type: sequelize.QueryTypes.SELECT})
}

async function actualizarProductoPorId(id_producto,nombre,img,precio){
    return await sequelize.query(`UPDATE productos SET nombre= "${nombre}", img = "${img}", precio = ${precio} WHERE id_producto = ?`,
                {replacements: [Number(id_producto)]})
                .then(async producto=>{                    
                    return await  sequelize.query('SELECT * FROM productos WHERE id_producto = ?',
                    {replacements: [Number(id_producto)], type: sequelize.QueryTypes.SELECT})
                })
}
   
module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProductoPorId
} 