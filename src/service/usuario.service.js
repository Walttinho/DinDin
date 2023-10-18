const bcrypt = require("bcrypt");
const usuarioRepository = require("../repository/usuario.repository");

const cadastrarUsuario = async (nome, email, senha) => {
  const senhaEncriptada = await bcrypt.hash(senha, 10);

  const emailExistente = await usuarioRepository.verificarEmailExistente(email);
  if (emailExistente) {
    const erro = new Error("Email já cadastrado");
    erro.status = 400;
    throw erro;
  }

  const novoUsuario = await usuarioRepository.cadastrarUsuario(
    nome,
    email,
    senhaEncriptada
  );

  const { senha: _, ...usuario } = novoUsuario;
  return usuario;
};

const obterDetalhesUsuario = async (id) => {
  try {
    const usuario = await usuarioRepository.encontrarUsuarioPorId(id);
    const { senha: _, ...detalhesUsuario } = usuario;
    return detalhesUsuario;
  } catch (error) {
    throw new Error("Erro ao obter detalhes do usuário");
  }
};

const atualizarUsuario = async (id, nome, email, senha) => {
  if (!id || !nome || !email || !senha) {
    const erro = new Error("Todos os campos são obrigatórios");
    erro.status = 400;
    throw erro;
  }

  const usuarioExistente = await usuarioRepository.encontrarUsuarioPorEmail(
    email
  );
  if (usuarioExistente && usuarioExistente.id !== id) {
    const erro = new Error(
      "O e-mail informado já está sendo utilizado por outro usuário."
    );
    erro.status = 400;
    throw erro;
  }

  const senhaEncriptada = await bcrypt.hash(senha, 10);
  await usuarioRepository.atualizarUsuario(id, nome, email, senhaEncriptada);
};

module.exports = {
  cadastrarUsuario,
  obterDetalhesUsuario,
  atualizarUsuario,
};
