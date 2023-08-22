const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String,  unique: [true, "Already exists."] },
  email: { type: String, unique: [true, "Already exists."] },
  password: { type: String },
});

module.exports = mongoose.model("users", usersSchema);
