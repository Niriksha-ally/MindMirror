const express = require("express");

const router = express.Router();

const Diary = require("../models/Diary");


// =====================================================
// GET DIARY ENTRIES
// =====================================================

router.get("/", async (req, res) => {

  try {

    const entries = await Diary.find()
      .sort({ createdAt: -1 });

    res.json(entries);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to get diary entries",
    });

  }

});


// =====================================================
// CREATE DIARY ENTRY
// =====================================================

router.post("/", async (req, res) => {

  try {

    const { text } = req.body;


    if (!text || text.trim() === "") {

      return res.status(400).json({
        message: "Diary text is required",
      });

    }


    const newEntry = new Diary({
      text: text.trim(),
    });


    const savedEntry =
      await newEntry.save();


    res.status(201).json(
      savedEntry
    );

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: "Failed to save diary entry",
      error: error.message,
    });

  }

});


module.exports = router;