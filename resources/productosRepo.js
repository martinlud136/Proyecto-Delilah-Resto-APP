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

async function getOne(id){
    return await sequelize.query('SELECT * FROM clientes WHERE id= ?',
 {replacements: [id], type: sequelize.QueryTypes.SELECT
 })
 }

   
module.exports = {
    crearProducto,
    getOne
} 