const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
    generateToken,
    verifyToken,
};