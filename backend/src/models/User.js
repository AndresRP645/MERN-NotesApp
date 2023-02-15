const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    l_name: {
      type: String,
      required: true,
    },
    sl_name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
);

module.exports = model("User", userSchema);
