const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// static files
app.use(express.static(path.join(__dirname, "public")));

// env
app.get("/config", (req, res) => {
  res.json({
    API_KEY: process.env.API_KEY
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running at http://localhost:${process.env.PORT || 3000}`);
});
