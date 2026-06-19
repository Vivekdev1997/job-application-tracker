const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

const emailValidator = body("email")
  .trim()
  .isEmail()
  .withMessage("A valid email is required")
  .normalizeEmail();

const passwordValidator = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters");

router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage("Name must be between 2 and 80 characters"),
    emailValidator,
    passwordValidator,
  ],
  validateRequest,
  authController.register,
);

router.post(
  "/login",
  [emailValidator, body("password").notEmpty().withMessage("Password is required")],
  validateRequest,
  authController.login,
);

router.post(
  "/forgot-password",
  [emailValidator],
  validateRequest,
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  [
    body("token").trim().notEmpty().withMessage("Reset token is required"),
    passwordValidator,
  ],
  validateRequest,
  authController.resetPassword,
);

module.exports = router;

