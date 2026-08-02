const express = require("express");

const app = express(); // creating an instance of express js

// app.use((req,res)=>{
//     res.send("Hello from server");
// })
// This will send irrespective of path, eg local:3000 and local:3000/getjsds - both ll show hello from server

app.use("/test", (req, res) => {
  res.send("Hello from test");
}); // This ll listen only when we local:3000/test, other - can't GET

app.use("/", (req, res) => {
  res.send("Hello from home");
}); 
app.listen(3000, () => {
  console.log("Server is running listening on port, 3000");
}); // listen incoming requests, call back is only called whn out=r server is running
