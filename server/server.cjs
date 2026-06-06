const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ratingRoutes = require("./routes/rating.cjs");
require("dotenv").config({ path: "./server/config.env" });

const authRoutes = require("./routes/auth.cjs");
const reviewRoutes = require("./routes/review.cjs");
const favoriteRoutes = require("./routes/favorite.cjs");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);

//
// CONNECT DATABASE
//
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//
// ROUTES
//
app.use("/api/auth", authRoutes);
app.use("/api/ratings", ratingRoutes);

//
// START SERVER
//
app.listen(5000, () => {
  console.log("Server running on port 5000");
});