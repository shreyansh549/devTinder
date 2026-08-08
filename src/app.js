const express = require("express");
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

// POST/ sign up/

app.post("/signup", async (req, res) => {

  const user = new User({
    firstName: "shreyansh",
    lastName: "Kumar",
    emailId: "babablacksheep549@gmail.com",
    password: "abc123",
  }); // creating a new instance of user model


  await user.save(); // return you a promise, save in DB

  res.send("User added succesfully");
});

connectDB()
  .then(() => {
    console.log("DB connreted");
    app.listen(3000, () => {
      console.log("Server is running listening on port, 3000");
    });
  })
  .catch((err) => {
    console.log("DB error ", err); 
  });
