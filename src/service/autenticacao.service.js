const autenticacaoRepository = require("../repository/autenticacao.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const realizarLogin = async (email, senha) => {
  if (!email || !senha) {
    const erro = new Error("email e senha são obrigatórios");
    erro.status = 400;
    throw erro;
  }

  const usuario = await autenticacaoRepository.buscarUsuarioPorEmail(email);

  if (!usuario) {
    const erro = new Error("email ou senha inválidos");
    erro.status = 401;
    throw erro;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    const erro = new Error("email ou senha inválidos");
    erro.status = 401;
    throw erro;
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
