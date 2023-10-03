const buscarCategorias = require("./controladores/categorias.controladores");
const validaToken = require("./middleware/autenticacao.middleware");
const {
  cadastrarUsuario,
  detalhesUsuario,
  atualizarUsuario,
} = require("./controladores/usuarios");
const login = require("./controladores/autenticacao.controladores");
const {
  cadastrarTransacao,
} = require("./controladores/transacoes.controladores");

const rotas = require("express")();

rotas.post("/usuario", cadastrarUsuario);

rotas.post("/login", login);

rotas.use(validaToken); // todas rotas abaixo serão necessário login

rotas.get("/usuario", detalhesUsuario);

rotas.put("/usuario", atualizarUsuario);

rotas.get("/categorias", buscarCategorias);

rotas.post("/transacao", cadastrarTransacao);

module.exports = rotas;
