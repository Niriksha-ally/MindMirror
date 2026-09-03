const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const checkInRoutes = require("./routes/checkInRoutes");
const diaryRoutes = require("./routes/diaryRoutes");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors()
);

app.use(
  express.json()
);


// =====================================================
// DATABASE
// =====================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB connected successfully"
    );

  })
  .catch((error) => {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

  });


// =====================================================
// ROUTES
// =====================================================

app.use(
  "/api/checkins",
  checkInRoutes
);

app.use(
  "/api/diary",
  diaryRoutes
);


// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {

  res.json({
    message:
      "MindMirror API is running 🌿",
  });

});


// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `MindMirror backend running on port ${PORT}`
    );

  }
);