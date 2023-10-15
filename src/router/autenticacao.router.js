const autenticacaoRouter = require("express").Router();

const autenticacaoController = require("../controller/autenticacao.controller");

autenticacaoRouter.post("/", autenticacaoController.realizarLogin);

module.exports = autenticacaoRouter;
