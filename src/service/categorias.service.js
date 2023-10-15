const categoriasRepository = require("../repository/categorias.repository");

const buscarTodasAsCategorias = async () => {
  try {
    return await categoriasRepository.buscarTodasAsCategorias();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  buscarTodasAsCategorias,
};
