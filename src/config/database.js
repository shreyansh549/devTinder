const mongoose = require("mongoose");


// this is refererring to a cluster
const connectDB = async () => {
  await mongoose.connect(
    // your mongo db connection string
  );
};
module.exports = connectDB;

