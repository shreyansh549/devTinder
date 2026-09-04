const mongoose = require("mongoose");
require('dotenv').config();

// this is refererring to a cluster
const connectDB = async () => {
  // you rmongo db connection string
  await mongoose.connect(process.env.MONGO_URI);
};
module.exports = connectDB;
