const pool = require("../conexão");

const buscarCategorias = async (req, res) => {
  try {
    const categorias = await pool.query("select * from categorias");
    res.status(200).json(categorias.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = buscarCategorias;
