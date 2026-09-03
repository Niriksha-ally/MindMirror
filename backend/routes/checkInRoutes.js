const express = require("express");

const router = express.Router();

const CheckIn = require("../models/CheckIn");


// =====================================================
// GET ALL CHECK-INS
// =====================================================

router.get("/", async (req, res) => {

  try {

    const checkIns = await CheckIn.find()
      .sort({ createdAt: 1 });

    res.json(checkIns);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to get check-ins",
    });

  }

});


// =====================================================
// CREATE CHECK-IN
// =====================================================

router.post("/", async (req, res) => {

  try {

    const {
      mood,
      stress,
      energy,
      sleep,
      goal,
      goalCompleted,
    } = req.body;


    const newCheckIn = new CheckIn({

      mood,
      stress,
      energy,
      sleep,
      goal,
      goalCompleted,

    });


    const savedCheckIn =
      await newCheckIn.save();


    res.status(201).json(
      savedCheckIn
    );

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: "Failed to save check-in",
      error: error.message,
    });

  }

});


module.exports = router;