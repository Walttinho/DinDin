const autenticacaoRouter = require("express").Router();

const { realizarLogin } = require("../controller/autenticacao.controller");

autenticacaoRouter.post("/", realizarLogin);

module.exports = autenticacaoRouter;
