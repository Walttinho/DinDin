const pool = require('../conexão')

const buscarCategorias = async(req, res)=>{
const categorias = await pool.query('select * from categorias')
res.status(200).json(categorias)
}

module.exports = buscarCategorias