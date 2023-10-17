const { buscarCategoriasService } = require("../service/categorias.service");


const buscarCategorias = async (req, res) => {
  try {
    const categorias = await buscarCategoriasService();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = {
  buscarCategorias,
};
