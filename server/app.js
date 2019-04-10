const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");
const app = express();

// Connecting to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/PostApp", {useNewUrlParser: true})
  .then(() => {
    console.log("Connected to the database");
  }).catch((error) => {
    console.error(error);
});

// Using the bodyParser to get the data from the incoming streams in the proper format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setting up the necessary configurations for handling CORS and all the valid HTTP methods supported
// by the API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POSTS, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
