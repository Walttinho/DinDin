const { buscarCategoriasRepository } = require("../repository/categorias.repository");


const buscarCategoriasService = async () => {
  try {
    return await buscarCategoriasRepository();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  buscarCategoriasService,
};
