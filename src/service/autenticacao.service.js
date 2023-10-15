const autenticacaoRepository = require("../repository/autenticacao.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const realizarLogin = async (email, senha) => {
  const usuario = await autenticacaoRepository.buscarUsuarioPorEmail(email);

  if (!usuario) {
    throw new Error("email ou senha inválidos");
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new Error("email ou senha inválidos");
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: 28800,
  });

  return {
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    token: token,
  };
};

module.exports = {
  realizarLogin,
};
