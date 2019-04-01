const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POSTS, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      content: "Post is coming from the server",
      id: "asa332dsf",
      title: "First Post on the Server",
    },
    {
      content: "Another Post is coming from the server",
      id: "qwerwr546we",
      title: "Second Post on the Server",
    },
  ];
  res.status(200).json({
    message: "Post fetched successfully",
    posts: posts,
  });
});

module.exports = app;
