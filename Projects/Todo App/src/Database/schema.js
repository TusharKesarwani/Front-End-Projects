const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  todo: String,
  description: String,
  target_date: String,
});

const todos = mongoose.model("tasks", schema);
module.exports = todos;
