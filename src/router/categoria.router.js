const categoriaRouter = require("express").Router();

const buscarCategorias = require("../controladores/categorias.controladores");
const validaToken = require("../middleware/autenticacao.middleware");

categoriaRouter.use(validaToken);

categoriaRouter.get("/", buscarCategorias);

module.exports = categoriaRouter;
