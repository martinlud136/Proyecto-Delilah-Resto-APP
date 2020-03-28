const sequelize = require('../dbConfig/db')

async function getMany(){
   return await sequelize.query('SELECT * FROM clientes',
{type: sequelize.QueryTypes.SELECT
})
}

async function getOne(id){
    return await sequelize.query('SELECT * FROM clientes WHERE id= ?',
 {replacements: [id], type: sequelize.QueryTypes.SELECT
 })
 }

   
module.exports = {
    getMany,
    getOne
} 