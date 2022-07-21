const { StatusCodes } = require('http-status-codes');

const insufficientAssetsError = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Asset illiquid',
};
const insufficientFundsError = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Insufficient funds',
};

const insufficientPortfolioError = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Insufficient assets in portfolio',
};

const nonexistentClientError = {
  code: StatusCodes.NOT_FOUND,
  message: 'Client does not exist',
};

const loginError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Incorrect username or password',
};

const tokenNotFoundError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Token not found',
};

const tokenInvalidError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Expired or invalid token',
};

const loginvalidateError = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Some required fields are missing',
};

const authorizationError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Service requested is not permitted to the user',
};

module.exports = {
  insufficientAssetsError,
  insufficientFundsError,
  insufficientPortfolioError,
  nonexistentClientError,
  loginError,
  tokenNotFoundError,
  tokenInvalidError,
  loginvalidateError,
  authorizationError,
};
