const pool = require("../conexão");

const cadastrarTransacao = async (req, res) => {
  try {
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    const usuarioId = req.usuarioId;

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
    }
    if (tipo !== "entrada" && tipo !== "saida") {
      return res
        .status(400)
        .json({ mensagem: "O campo 'tipo' deve ser 'entrada' ou 'saida'." });
    }
    const categoria = await pool.query(
      "SELECT * FROM categorias WHERE id = $1",
      [categoria_id]
    );

    if (!categoria.rows.length) {
      res.status(400).json({ mensagem: "A categoria especificada não existe" });
    }

    const resultado = await pool.query(
      "INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [tipo, descricao, valor, data, categoria_id, usuarioId]
    );
    
    const dataFormatada = new Date(data)
  

    const transacaoCadastrada = {
      id: resultado.rows[0].id,
      tipo,
      descricao,
      valor,
      data: dataFormatada,
      usuario_id: usuarioId,
      categoria_id,
      categoria_nome: categoria.rows[0].descricao,
    };

    res.status(201).json(transacaoCadastrada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = { cadastrarTransacao };
