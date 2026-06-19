const jwt = require("jsonwebtoken");

const env = require("../config/env");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const protect = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication token is required");
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub).select("-password");

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    return next(new ApiError(401, "Invalid or expired token"));
  }
};

module.exports = { protect };

