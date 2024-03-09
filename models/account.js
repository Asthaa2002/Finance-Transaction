const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  accountHolder: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  accountNumber: { type: String, unique: true, required: true },

  balance: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("account", accountSchema);
