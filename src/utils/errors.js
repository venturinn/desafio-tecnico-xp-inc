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
  message: 'Insufficient assets in portfolio ',
};

const nonexistentClientError = {
  code: StatusCodes.NOT_FOUND,
  message: 'Client does not exist',
};

const loginError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Incorrect username or password',
};

module.exports = {
  insufficientAssetsError,
  insufficientFundsError,
  insufficientPortfolioError,
  nonexistentClientError,
  loginError,
};
