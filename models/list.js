var mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  task: String,
  deadline: Date,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
