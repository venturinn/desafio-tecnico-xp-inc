const { Cliente } = require('../db/models');
const { loginError } = require('../utils/errors');
const { generateToken } = require('../utils/jwt');

const login = async (email, senha) => {
  const client = await Cliente.findOne({
    where: { email, senha },
    attributes: ['codCliente', 'nome'],
  });

  if (!client) {
    return { error: loginError };
  }

  console.log(client);

  return generateToken(client.dataValues);
};

module.exports = {
  login,
};
