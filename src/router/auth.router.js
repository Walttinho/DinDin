const authRouter = require("express").Router();

const login = require("../controladores/autenticacao.controladores");

authRouter.post("/", login);

module.exports = authRouter;
