const pool = require("../database/database");

const buscarTodasAsCategorias = async () => {
  try {
    const categorias = await pool.query("select * from categorias");
    return categorias.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  buscarTodasAsCategorias,
};
