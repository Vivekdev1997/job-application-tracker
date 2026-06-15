const app = require("./src/app");
const env = require("./src/config/env");

const server = app.listen(env.port, () => {
  console.log(`API listening on port ${env.port} in ${env.nodeEnv} mode`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Closing HTTP server.`);
  server.close(() => process.exit(0));
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

