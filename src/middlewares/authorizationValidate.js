const { authorizationError } = require('../utils/errors');

module.exports = async (req, _res, next) => {
  const { codCliente } = req.body;
  const codClientToken = req.user;

  if (codClientToken !== codCliente) {
    return next(authorizationError);
  }

  return next();
};
