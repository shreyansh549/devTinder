const mongoose = require("mongoose");


// this is refererring to a cluster
const connectDB = async () => {
    // you rmongo db connection string
  await mongoose.connect(
    "REMOVED_MONGO_CREDENTIAL",
  );
};
module.exports = connectDB;

