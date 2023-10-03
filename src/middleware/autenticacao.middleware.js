const jwt = require('jsonwebtoken')
const validaToken = (req,res,next)=>{
try {
  const {authorization} = req.headers

  if(!authorization){
    return res.status(400).json({mensagem: "Token não fornecido"})
  }
const divisao = authorization.split(' ')

if(divisao.length !== 2){
  res.status(400).json({mensagem: "Token em formato inválido" })
}

const [palavra, token ] = divisao

if(palavra !== "Bearer"){
  res.status(400).json({mensagem: "Na autorização não contém Bearer"})
}

const verificar = jwt.verify(token, process.env.JWT_SECRET)

req.usuarioId = verificar.id

next()

} catch (error) {
  console.error(error);
  res.status(500).json({ mensagem: "Erro no servidor." });
}
}

module.exports = validaToken