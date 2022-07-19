const { verifyToken } = require('../utils/jwt');
const { tokenNotFoundError, tokenInvalidError } = require('../utils/errors');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(tokenNotFoundError);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded.codCliente;

    return next();
  } catch {
    return next(tokenInvalidError);
  }
};
