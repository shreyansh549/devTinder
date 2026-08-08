const express = require("express");

const app = express();

// It ll match  /user, /user/xyz, /user/1
// not supported in express 5
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Shreyansh", lastName: "Kumar" });
// });

// complex routes

// not supported in express 5
//Means - b is optional here . /ac and /abc ll work
// app.get("/ab?c", (req, res) => {
//   res.send("abc");
// });

// use regex or define routes explicitly
app.get(/^\/ab?c$/, (req, res) => {
  res.send("ab?c");
});

//explicitly routes
app.get("/ac", (req, res) => {
  res.send("abc");
});

app.get("/abc", (req, res) => {
  res.send("abc");
});

// get   query params

app.get("/user", (req, res) => {
  console.log(req.query);
  //[Object: null prototype] { userId: '101' }
  res.send("user with query params");
});

//dynamic routes

app.get("/user/:userId", (req, res) => {
  console.log(req.params); 
  //[Object: null prototype] { userId: '202' }
  res.send("user with params"); 
});

// means   a and c are at extremes and write as many b's in between - abc, abbc, abbbbc, abbbbbbbbc works
// app.get("/ab+c", (req, res) => {
//   res.send("ab+c");
// });

app.listen(3000, () => {
  console.log("Server is running listening on port, 3000");
});
