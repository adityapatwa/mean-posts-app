const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/posts");

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

// Create a new post
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    content: req.body.content,
    title: req.body.title,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        content: createdPost.content,
        id: createdPost._id,
        title: createdPost.title,
      },
    });
  });

});

// Deleting a post
app.delete("/api/posts/:id", (req, res, next) => {
  const id = req.params.id;
  const post = Post.findOneAndDelete({_id: id}).then((deletedPost) => {
    return deletedPost;
  });
  res.status(204).json({
    message: `Post with title ${post.title} deleted successfully`,
    post: post,
  });
});

// Fetching all the posts
// Can also use app.get below
app.use("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Post fetched successfully",
      posts: documents,
    });
  });
});

module.exports = app;
