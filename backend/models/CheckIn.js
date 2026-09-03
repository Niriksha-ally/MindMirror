const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    mood: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    stress: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    energy: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    sleep: {
      type: Number,
      required: true,
      min: 0,
      max: 24,
    },

    goal: {
      type: String,
      default: "",
      trim: true,
    },

    goalCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CheckIn",
  checkInSchema
);