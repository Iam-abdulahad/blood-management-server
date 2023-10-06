const express = require("express");
const cors = require("cors");
const {} = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.get("/", (eq, res) => {
  res.send("server is running for blood management....!");
});

app.listen(port, () => {
  console.log(`Curd server is running on port ${port}`);
});
