const express = require("express");
const router = express.Router();
const _ = require("lodash");

const Post = require("../models/posts");

// Create a new post
router.post("", (req, res, next) => {
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
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const post = Post.findOneAndDelete({_id: id}).then((deletedPost) => {
    return deletedPost;
  });
  res.status(204).json({
    message: `Post with title ${post.title} deleted successfully`,
    post: post,
  });
});

// Updating a single post
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  let body = _.pick(req.body, ["title", "content"]);
  Post.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((post) => {
    res.status(200).json({
      message: `Post with Id ${post.id} was updated successfully`,
      post: post,
    });
  });
});

//Fetching a single post
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Post.findOne({_id: id}).then((post) => {
    res.status(200).json({
      message: `Post with Id ${post.id} was fetched successfully`,
      post: post,
    });
  });
});

// Fetching all the posts
// Can also use app.get below
router.use("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Post fetched successfully",
      posts: documents,
    });
  });
});

module.exports = router;
