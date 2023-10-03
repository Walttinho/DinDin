const rotas = require("express")();
const { cadastrarUsuario } = require("./controladores/usuarios");

rotas.post("/usuario", cadastrarUsuario);

module.exports = rotas;
