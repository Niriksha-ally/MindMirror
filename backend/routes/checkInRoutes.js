const express = require("express");
const CheckIn = require("../models/CheckIn");

const router = express.Router();


// SAVE A CHECK-IN
router.post("/", async (req, res) => {
  try {

    const newCheckIn = new CheckIn({
      mood: req.body.mood,
      stress: req.body.stress,
      energy: req.body.energy,
      sleep: req.body.sleep,
      goal: req.body.goal
    });

    const savedCheckIn = await newCheckIn.save();

    res.status(201).json(savedCheckIn);

  } catch (error) {

    res.status(500).json({
      message: "Failed to save check-in",
      error: error.message
    });

  }
});


// GET ALL CHECK-INS
router.get("/", async (req, res) => {
  try {

    const checkIns = await CheckIn.find().sort({ date: -1 });

    res.json(checkIns);

  } catch (error) {

    res.status(500).json({
      message: "Failed to get check-ins",
      error: error.message
    });

  }
});


module.exports = router;