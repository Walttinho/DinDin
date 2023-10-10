const transacaoRouter = require("express").Router();

const {
  cadastrarTransacao,
  listarTransacao,
  detalharTransacoes,
  atualizarTransacao,
  excluirTransacao,
  obterExtrato,
} = require("../controladores/transacoes.controladores");
const validaToken = require("../middleware/autenticacao.middleware");


transacaoRouter.use(validaToken);

transacaoRouter.post("/", cadastrarTransacao);

transacaoRouter.get("/", listarTransacao);

transacaoRouter.get("/extrato", obterExtrato);

transacaoRouter.get("/:id", detalharTransacoes);

transacaoRouter.put("/:id", atualizarTransacao);

transacaoRouter.delete("/:id", excluirTransacao);

module.exports = transacaoRouter;
