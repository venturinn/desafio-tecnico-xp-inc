const { StatusCodes } = require('http-status-codes');

const insufficientAssetsError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Asset illiquid',
};
const insufficientFundsError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Insufficient funds',
};

const insufficientPortfolioError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Insufficient assets in portfolio ',
};

const nonexistentClientError = {
  code: StatusCodes.NOT_FOUND,
  message: 'Client does not exist',
};

module.exports = {
  insufficientAssetsError,
  insufficientFundsError,
  insufficientPortfolioError,
  nonexistentClientError,
};
