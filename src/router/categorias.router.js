const categoriaRouter = require("express").Router();

const {buscarCategorias} = require("../controller/categorias.controller");
const validaToken = require("../middleware/autenticacao.middleware");

categoriaRouter.use(validaToken);

categoriaRouter.get("/", buscarCategorias);

module.exports = categoriaRouter;
