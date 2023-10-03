const pool = require("../conexão");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome.trim() || !email.trim() || !senha.trim()) {
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

module.exports = { cadastrarUsuario };
