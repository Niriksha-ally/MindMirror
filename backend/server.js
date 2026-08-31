const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const checkInRoutes = require("./routes/checkInRoutes");
const diaryRoutes = require("./routes/diaryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/checkins", checkInRoutes);
app.use("/api/diary", diaryRoutes);

app.get("/", (req, res) => {
  res.send("MindMirror backend is running!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:");
    console.log(error.message);
  });