module.exports = (err, _req, res, _next) => {
    const status = err.code || 500;
    const message = err.message || 'An unexpected error occurred. Please try again later.';
  
    return res.status(status).json({ message });
  };