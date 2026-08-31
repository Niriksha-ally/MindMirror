const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema({
  mood: {
    type: Number,
    required: true
  },

  stress: {
    type: Number,
    required: true
  },

  energy: {
    type: Number,
    required: true
  },

  sleep: {
    type: Number,
    required: true
  },

  goal: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

const CheckIn = mongoose.model("CheckIn", checkInSchema);

module.exports = CheckIn;