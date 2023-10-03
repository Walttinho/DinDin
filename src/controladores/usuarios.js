const pool = require("../conexão");
const bcrypt = require("bcrypt");

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

module.exports = { cadastrarUsuario, detalhesUsuario };
