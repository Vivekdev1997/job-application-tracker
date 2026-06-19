const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const env = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== "test") {
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
}

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/health", healthRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
