const dns = require("node:dns");
const mongoose = require("mongoose");

const env = require("./env");

const connectDatabase = async (uri) => {
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  if (env.dnsServers.length > 0) {
    dns.setServers(env.dnsServers);
  }

  await mongoose.connect(uri, { dbName: env.mongodbDbName });
  console.log(`MongoDB connected to ${env.mongodbDbName}`);
};

module.exports = connectDatabase;
