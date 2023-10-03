const login = require("./controller/autenticacao.controller");

const rotas = require("express")();


rotas.post('/login', login)

module.exports = rotas;
