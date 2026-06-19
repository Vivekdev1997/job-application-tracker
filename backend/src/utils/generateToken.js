const jwt = require("jsonwebtoken");

const env = require("../config/env");

const generateToken = (userId) => {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign({ sub: userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

module.exports = generateToken;

