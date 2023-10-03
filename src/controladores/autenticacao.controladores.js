const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../conexão");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const usuario = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );
    if (usuario.rows.length === 0) {
      return res.status(401).json({ mensagem: "email ou senha inválidos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.rows[0].senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "email ou senha inválidos" });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: 28800,
    });

  res.status(200).json({usuario, token})
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = login;
