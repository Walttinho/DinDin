const pool = require("../database/database");
const bcrypt = require("bcrypt");
const { verificarCampos } = require("./transacoes.controller");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Informações incompletas" });
  }

  try {
    const { rowCount } = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );
    if (rowCount > 0) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaEncriptada = await bcrypt.hash(senha, 10);

    const novoUsuario = await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *",
      [nome, email, senhaEncriptada]
    );

    const { senha: _, ...usuario } = novoUsuario.rows[0];
    return res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

const detalhesUsuario = async (req, res) => {
  try {
    const infoUsuario = await pool.query(
      "select * from usuarios where id = $1",
      [req.usuarioId]
    );
    const { senha: _, ...usuario } = infoUsuario.rows[0];

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  verificarCampos([nome, email, senha], res);

  try {
    const { rowCount, rows } = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );
    if (rowCount > 0 && rows[0].id != req.usuarioId) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const senhaEncriptada = await bcrypt.hash(senha, 10);

    await pool.query(
      "update usuarios set nome = $1, email = $2, senha = $3 where id = $4",
      [nome, email, senhaEncriptada, req.usuarioId]
    );

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = { cadastrarUsuario, detalhesUsuario, atualizarUsuario };
