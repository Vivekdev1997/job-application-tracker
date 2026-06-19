const app = require("./src/app");
const connectDatabase = require("./src/config/database");
const env = require("./src/config/env");

let server;

const startServer = async () => {
  if (env.hasPlaceholderMongoUri) {
    throw new Error("MONGODB_URI must be set to your real MongoDB Atlas URI");
  }

  if (env.hasPlaceholderJwtSecret) {
    throw new Error("JWT_SECRET must be replaced with a secure local secret");
  }

  await connectDatabase(env.mongodbUri);

  server = app.listen(env.port, () => {
    console.log(`API listening on port ${env.port} in ${env.nodeEnv} mode`);
  });
};

const shutdown = (signal) => {
  console.log(`${signal} received. Closing HTTP server.`);

  if (!server) {
    process.exit(0);
  }

  server.close(() => process.exit(0));
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

startServer().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
