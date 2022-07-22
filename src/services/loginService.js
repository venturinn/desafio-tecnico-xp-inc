const { compareSync } = require('bcrypt-nodejs');
const { Cliente } = require('../db/models');
const { loginError } = require('../utils/errors');
const { generateToken } = require('../utils/jwt');

const login = async (email, senha) => {
  const client = await Cliente.findOne({
    where: { email },
    attributes: ['codCliente', 'senha'],
  });

  if (!client || !compareSync(senha, client.senha)) {
    return { error: loginError };
  }

  return { token: generateToken({ codCliente: client.codCliente }) };
};

module.exports = {
  login,
};
