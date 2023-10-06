const buscarCategorias = require("./controladores/categorias.controladores");
const validaToken = require("./middleware/autenticacao.middleware");
const {
  cadastrarUsuario,
  detalhesUsuario,
  atualizarUsuario,
} = require("./controladores/usuarios.controladores");
const login = require("./controladores/autenticacao.controladores");
const {
  cadastrarTransacao,
  listarTransacao,
  detalharTransacoes,
  atualizarTransacao,
  excluirTransacao,
  obterExtrato,
} = require("./controladores/transacoes.controladores");

const rotas = require("express")();

rotas.post("/usuario", cadastrarUsuario);

rotas.post("/login", login);

rotas.use(validaToken); // todas rotas abaixo serão necessário login

rotas.get("/usuario", detalhesUsuario);

rotas.put("/usuario", atualizarUsuario);

rotas.get("/categoria", buscarCategorias);

rotas.post("/transacao", cadastrarTransacao);

rotas.get("/transacao", listarTransacao);

rotas.get("/transacao/extrato", obterExtrato);

rotas.get("/transacao/:id", detalharTransacoes);

rotas.put("/transacao/:id", atualizarTransacao);

rotas.delete("/transacao/:id", excluirTransacao);

module.exports = rotas;
