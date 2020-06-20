const mongoose = require("mongoose");
//const slugify = require('slugify');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
    gid: String,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
