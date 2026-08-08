// schema of user collection

const mongoose = require("mongoose");
//creating a user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  }, 
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

// creating a user Model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
