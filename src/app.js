const express = require("express");
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.use(express.json()); // a middleware,- works for all the incoming routes. We have to convert it . Our server not able to read JSON data , we need a middleware to convert into readable format(JS Object)

// POST/ sign up/

app.post("/signup", async (req, res) => {
  //   const user = new User({
  //     firstName: "shreyansh",
  //     lastName: "Kumar",
  //     emailId: "babablacksheep549@gmail.com",
  //     password: "abc123",
  //   });
  // creating a new instance of user model - hardcode example

  // req.body - ll give you undefined without(aap.use(express.json())),  bcz it is in JSON format. We need to convert it to JS, for that, we are using use express json -- middleware

  // creating a new instance of user model
  const user = new User(req.body);

  try {
    await user.save(); // return you a promise, save in D/B
    res.send("User added succesfully");
  } catch (error) {
    res.status(400).send("Error saving the users:" + error.message);
  }
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
