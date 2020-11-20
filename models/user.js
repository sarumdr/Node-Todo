var mongoose = require("mongoose");

var USERSCHEMA = mongoose.Schema({
  user: String,
  password: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", USERSCHEMA);
