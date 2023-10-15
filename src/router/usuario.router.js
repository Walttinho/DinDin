const usuarioRouter = require("express").Router();

const {
  cadastrarUsuario,
  detalhesUsuario,
  atualizarUsuario,
} = require("../controller/usuarios.controller");
const validaToken = require("../middleware/autenticacao.middleware");

usuarioRouter.post("/", cadastrarUsuario);

usuarioRouter.use(validaToken);

usuarioRouter.get("/", detalhesUsuario);

usuarioRouter.put("/", atualizarUsuario);

module.exports = usuarioRouter;
