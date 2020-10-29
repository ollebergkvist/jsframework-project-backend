const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      default: true,
      lowercase: true,
    },
    balance: {
      type: Number,
    },
    portfolio: [
      {
        name: String,
        amount: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
