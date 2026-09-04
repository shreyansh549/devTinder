const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();

const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

app.use(express.json()); // a middleware,- works for all the incoming routes. We have to convert it . Our server not able to read JSON data , we need a middleware to convert into readable format(JS Object)

// POST/ sign up/

app.post("/signup", async (req, res) => {
  try {
    //   const user = new User({
    //     firstName: "shreyansh",
    //     lastName: "Kumar",
    //     emailId: "babablacksheep549@gmail.com",
    //     password: "abc123",
    //   });
    // creating a new instance of user model - hardcode example

    // req.body - ll give you undefined without(aap.use(express.json())),  bcz it is in JSON format. We need to convert it to JS, for that, we are using use express json -- middleware

    // creating a new instance of user model

    // Validation OF Data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const hassedPassword = await bcrypt.hash(password, 10);

    // DONT USE
    //const user = new User(req.body)

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hassedPassword,
    });

    //E ncryption of Passowrd

    await user.save(); // return you a promise, save in D/B
    res.send("User added succesfully");
  } catch (error) {
    res.status(400).send("Error saving the users:" + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Email Id Format is not correct");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid =await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Log in Successfull!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// suppose want to find a document in DB
// find a single user

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }

    //find one

    const user = await User.findOne({ emailId: userEmail });

    if (!user) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrogng");
  }
});

//GEt all users from DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong ");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log("user", userId);

  try {
    const deltedId = await User.findOneAndDelete(userId); // shorthand for this - const userId = await User.findByIdAndDelete({_id: userId} )
    console.log("deltedId", deltedId);
    res.send("User deleted succesfully");
  } catch (error) {
    res.send("Something went wrong");
  }
});

//patch

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.send("Update Failed", error.message);
  }
});

// any data which is not part of schema sent i payload will not be saved in DB

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
