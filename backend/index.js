const express = require("express");
const app = express();
require("dotenv").config();

app.listen(process.env.port, async () => {
  try {
    console.log(`App is running at port ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
