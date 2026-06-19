const path = require("node:path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const isPlaceholder = (value, placeholders) =>
  !value || placeholders.some((placeholder) => value.includes(placeholder));

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  dnsServers: process.env.DNS_SERVERS
    ? process.env.DNS_SERVERS.split(",").map((server) => server.trim())
    : [],
  mongodbUri: process.env.MONGODB_URI,
  mongodbDbName: process.env.MONGODB_DB_NAME || "job-tracker",
  hasPlaceholderMongoUri: isPlaceholder(process.env.MONGODB_URI, [
    "username:password",
    "cluster.mongodb.net",
  ]),
  hasPlaceholderJwtSecret: isPlaceholder(process.env.JWT_SECRET, [
    "replace-with-a-long-random-secret",
  ]),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
