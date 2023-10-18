const autenticacaoService = require("../service/autenticacao.service");

const realizarLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resposta = await autenticacaoService.realizarLogin(email, senha);
    res.status(200).json(resposta);
  } catch (error) {
    res.status(error.status).json({ mensagem: error.message });
  }
};

module.exports = {
  realizarLogin,
};
