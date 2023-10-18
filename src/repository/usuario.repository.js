const pool = require("../database/database");

const verificarEmailExistente = async (email) => {
  const { rowCount } = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  return rowCount > 0;
};

const cadastrarUsuario = async (nome, email, senhaEncriptada) => {
  const novoUsuario = await pool.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
    [nome, email, senhaEncriptada]
  );
  return novoUsuario.rows[0];
};

const encontrarUsuarioPorEmail = async (email) => {
  const usuario = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  return usuario.rows[0];
};

const encontrarUsuarioPorId = async (id) => {
  const usuario = await pool.query(
    "SELECT * FROM usuarios WHERE id = $1",
    [id]
  );
  return usuario.rows[0];
};

const atualizarUsuario = async (id, nome, email, senhaEncriptada) => {
  await pool.query(
    "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4",
    [nome, email, senhaEncriptada, id]
  );
};

module.exports = {
  verificarEmailExistente,
  cadastrarUsuario,
  encontrarUsuarioPorEmail,
  encontrarUsuarioPorId,
  atualizarUsuario,
};
