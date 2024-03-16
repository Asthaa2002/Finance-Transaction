const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
   
    income: {
      type: Number,
      required: true
    },
    expense: {
      type: Number,
      required: true
    },
    saving: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const transaction = mongoose.model("Transaction", transactionSchema);
module.exports = transaction;
