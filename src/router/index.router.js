const router = require("express").Router();

const transacaoRouter = require("./transacoes.router");
const autenticacaoRouter = require("./autenticacao.router");
const usuarioRouter = require("./usuario.router");
const categoriaRouter = require("./categoria.router");
const swaggerRouter = require("./swagger.route.js");

router.use("/usuario", usuarioRouter);
router.use("/login", autenticacaoRouter);
router.use("/transacao", transacaoRouter);
router.use("/categoria", categoriaRouter);
router.use("/doc", swaggerRouter);

module.exports = router;
