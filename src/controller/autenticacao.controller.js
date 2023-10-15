const autenticacaoService = require("../service/autenticacao.service");

const realizarLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resposta = await autenticacaoService.realizarLogin(email, senha);
    res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = {
  realizarLogin,
};

