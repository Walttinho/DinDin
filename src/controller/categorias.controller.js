const categoriasService = require("../service/categorias.service");

const buscarCategorias = async (req, res) => {
  try {
    const categorias = await categoriasService.buscarTodasAsCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = {
  buscarCategorias,
};
