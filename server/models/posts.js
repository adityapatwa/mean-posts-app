const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  content: {type: String, required: true, trim: true},
  title: {type: String, required: true, trim: true},
});

module.exports = mongoose.model("Post", postSchema);
