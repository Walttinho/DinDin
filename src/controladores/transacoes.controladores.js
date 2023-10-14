const pool = require("../conexão");

const verificarCampos = (campos, res) => {
  for (let campo of campos) {
    if (!campo) {
      return res.status(400).json({
        mensagem: "Todos os campos obrigatórios devem ser informados.",
      });
    }
  }
};

const cadastrarTransacao = async (req, res) => {
  try {
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    const usuarioId = req.usuarioId;

    verificarCampos([tipo, descricao, valor, data, categoria_id], res);

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
      return res
        .status(400)
        .json({ mensagem: "A categoria especificada não existe" });
    }

    const resultado = await pool.query(
      "INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [tipo, descricao, valor, data, categoria_id, usuarioId]
    );

    const transacaoCadastrada = {
      id: resultado.rows[0].id,
      tipo,
      descricao,
      valor,
      data,
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

const listarTransacao = async (req, res) => {
  const categorias = req.query.filtro;
  const usuarioId = req.usuarioId;

  try {
    if (categorias) {
      if (categorias.length === 0) {
        return res
          .status(400)
          .json({ mensagem: "Nenhuma categoria fornecida" });
      }

      const indice = categorias.map((categoria, index) => `$${index + 2}`);
      const consultaString = `
        SELECT * FROM transacoes
        WHERE usuario_id = $1 AND descricao IN (${indice.join(",")})
      `;

      const valores = [usuarioId, ...categorias];

      const resultado = await pool.query(consultaString, valores);

      return res.status(200).json(resultado.rows);
    } else {
      const resultado = await pool.query(
        `SELECT t.*, c.descricao as categoria_nome
        FROM transacoes t
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
        `,
        [usuarioId]
      );
      return res.status(200).json(resultado.rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

const detalharTransacoes = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const id = req.params.id;
    const resultado = await pool.query(
      `SELECT t.*, c.descricao as categoria_nome
      FROM transacoes t
      JOIN categorias c ON t.categoria_id = c.id
      WHERE t.usuario_id = $1 and t.id = $2
      `,
      [usuarioId, id]
    );

    if (resultado.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: " Não existe transações para o id especificado" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const transacao = await pool.query(
      "select * from transacoes where usuario_id = $1 and id = $2",
      [req.usuarioId, id]
    );
    if (transacao.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: " Não existe transações para o id especificado" });
    }

    verificarCampos([descricao, valor, data, categoria_id, tipo], res);

    const categoria = await pool.query(
      "select * from categorias where id = $1",
      [categoria_id]
    );
    if (categoria.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: " Não existe categoria para o id especificado" });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({ mensagem: "Tipo informado é inválido" });
    }

    await pool.query(
      "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6",
      [descricao, valor, data, categoria_id, tipo, id]
    );

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

const excluirTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const transacao = await pool.query(
      "select * from transacoes where usuario_id = $1 and id = $2",
      [req.usuarioId, id]
    );
    if (transacao.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: " Não existe transações para o id especificado" });
    }

    await pool.query("delete from transacoes where id = $1", [id]);

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

const obterExtrato = async (req, res) => {
  let entrada = 0;
  let saida = 0;
  try {
    const valorTransacoes = await pool.query(
      "select valor, tipo from transacoes where usuario_id = $1",
      [req.usuarioId]
    );
    for (let objeto of valorTransacoes.rows) {
      switch (objeto.tipo) {
        case "entrada":
          entrada += objeto.valor;
          break;
        case "saida":
          saida += objeto.valor;
          break;
      }
    }
    return res.status(200).json({ entrada, saida });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = {
  cadastrarTransacao,
  listarTransacao,
  detalharTransacoes,
  atualizarTransacao,
  excluirTransacao,
  obterExtrato,
  verificarCampos,
};
