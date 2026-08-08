const express = require("express");

const app = express(); // creating an instance of express js

// app.use((req,res)=>{
//     res.send("Hello from server");
// })
// This will send irrespective of path, eg local:3000 and local:3000/getjsds - both ll show hello from server

// app.use("/test", (req, res) => {
//   res.send("Hello from test");
// }); // This ll listen only when we local:3000/test, other - can't GET

// app.use("/", (req, res) => {
//   res.send("Hello from home");
// });

// app.use - ll match all the http method API calls

// This ll match only to GET call

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Shreyansh", lastName: "Kumar" });
// });

// app.post("/user", (req, res) => {
//   console.log("Saved");
//   res.send("Date succesfully saved to DB");
// });

// app.delete("/user", (req, res) => {
//   console.log("Deleted");
//   res.send("Date Deleted");
// });

// what ll happen if we dont return anything ? -
// then  browser/postman ll keep waiting for the
//  response. After sometime, timeout error ll thrown

app.get(
  "/user",
  (req, res) => {
    console.log("Handling the route user");
    res.send("Response");
  },
  (req, res) => { 
    console.log("Handling the route user");
    res.send("Response");
  },
);

app.listen(3000, () => {
  console.log("Server is running listening on port, 3000");
}); // listen incoming requests, call back is only called whn out=r server is running
