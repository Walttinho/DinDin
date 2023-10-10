const usuarioRouter = require("express").Router();

const {
  cadastrarUsuario,
  detalhesUsuario,
  atualizarUsuario,
} = require("../controladores/usuarios.controladores");
const validaToken = require("../middleware/autenticacao.middleware");

usuarioRouter.post("/", cadastrarUsuario);

usuarioRouter.use(validaToken);

usuarioRouter.get("/", detalhesUsuario);

usuarioRouter.put("/", atualizarUsuario);

module.exports = usuarioRouter;
