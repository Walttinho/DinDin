const pool = require("../database/database");

const buscarUsuarioPorEmail = async (email) => {
  const usuario = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  return usuario.rows[0];
};

module.exports = {
  buscarUsuarioPorEmail,
};
