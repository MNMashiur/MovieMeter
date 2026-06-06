const express = require("express");

const Rating = require("../models/Rating.cjs");

const router = express.Router();

//
// ADD OR UPDATE RATING
//
router.post("/rate", async (req, res) => {

  try {

    const {
      movieId,
      userId,
      rating
    } = req.body;

    // check existing rating
    let existingRating = await Rating.findOne({
      movieId,
      userId
    });

    if (existingRating) {

      existingRating.rating = rating;

      await existingRating.save();

    } else {

      await Rating.create({
        movieId,
        userId,
        rating
      });

    }

    res.json({
      message: "Rating saved"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

//
// GET AVERAGE RATING
//
router.get("/average/:movieId", async (req, res) => {

  try {

    const movieId = Number(req.params.movieId);

    const ratings = await Rating.find({ movieId });

    if (ratings.length === 0) {

      return res.json({
        average: 0
      });

    }

    const total =
      ratings.reduce(
        (sum, item) => sum + item.rating,
        0
      );

    const average =
      total / ratings.length;

    res.json({
      average: average.toFixed(1),
      totalRatings: ratings.length
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;