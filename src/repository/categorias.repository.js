const pool = require("../database/database");

const buscarCategoriasRepository = async () => {
  try {
    const categorias = await pool.query("select * from categorias");
    return categorias.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  buscarCategoriasRepository,
};
