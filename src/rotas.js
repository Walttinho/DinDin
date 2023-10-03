const login = require("./controller/autenticacao.controller");

const rotas = require("express")();
const { cadastrarUsuario } = require("./controladores/usuarios");

rotas.post("/usuario", cadastrarUsuario);


rotas.post('/login', login)

module.exports = rotas;
