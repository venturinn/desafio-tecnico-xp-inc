const { StatusCodes } = require('http-status-codes');

module.exports = (err, _req, res, _next) => {
    const status = err.code || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'An unexpected error occurred. Please try again later.';
  
    return res.status(status).json({ message });
  };