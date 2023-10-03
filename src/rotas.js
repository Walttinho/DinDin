const login = require("./controller/autenticacao.controller");
const buscarCategorias = require("./controller/categorias.controller");
const validaToken = require("./middleware/autenticacao.middleware");

const rotas = require("express")();
const { cadastrarUsuario } = require("./controladores/usuarios");

rotas.post("/usuario", cadastrarUsuario);


rotas.post('/login', login)


rotas.use(validaToken) // todas rotas abaixo serão necessário login

rotas.get('/categorias', buscarCategorias)

module.exports = rotas;
