const express = require("express");
const Diary = require("../models/Diary");

const router = express.Router();

// POST - Save diary entry
router.post("/", async (req, res) => {
  try {
    const diary = new Diary({
      text: req.body.text
    });

    const savedDiary = await diary.save();

    res.status(201).json(savedDiary);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to save diary entry"
    });
  }
});

// GET - Get all diary entries
router.get("/", async (req, res) => {
  try {
    const diaryEntries = await Diary.find().sort({
      createdAt: -1
    });

    res.json(diaryEntries);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get diary entries"
    });
  }
});

module.exports = router;