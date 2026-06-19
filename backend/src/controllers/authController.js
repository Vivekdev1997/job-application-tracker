const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const auth = await authService.register(req.body);
    res.status(201).json({ success: true, data: auth });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const auth = await authService.login(req.body);
    res.status(200).json({ success: true, data: auth });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const resetToken = await authService.requestPasswordReset(req.body.email);

    res.status(200).json({
      success: true,
      message:
        "If an account exists for that email, password reset instructions have been generated.",
      ...(process.env.NODE_ENV === "development" && resetToken
        ? { resetToken }
        : {}),
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const auth = await authService.resetPassword(req.body);
    res.status(200).json({ success: true, data: auth });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  forgotPassword,
  login,
  register,
  resetPassword,
};

