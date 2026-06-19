const crypto = require("node:crypto");

const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");

const createAuthResponse = (user) => ({
  user: user.toAuthJSON(),
  token: generateToken(user._id.toString()),
});

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create({ name, email, password });
  return createAuthResponse(user);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return createAuthResponse(user);
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
  await user.save({ validateBeforeSave: false });

  return rawToken;
};

const resetPassword = async ({ token, password }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) {
    throw new ApiError(400, "Password reset token is invalid or expired");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return createAuthResponse(user);
};

module.exports = {
  login,
  register,
  requestPasswordReset,
  resetPassword,
};

