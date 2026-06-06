const express = require("express");

const router = express.Router();

const Review =
  require("../models/Review.cjs");

//
// ADD REVIEW
//
router.post("/", async (req, res) => {

  try {

    const {

      movieId,

      userId,

      rating,

      review

    } = req.body;

    // generate anonymous username
    const anonymousName =

      "MovieFan" +

      Math.floor(
        Math.random() * 10000
      );

    const newReview =
      new Review({

        movieId,

        userId,

        rating,

        review,

        anonymousName
      });

    await newReview.save();

    res.json({
      message:
        "Review added successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

//
// GET REVIEWS FOR MOVIE
//
router.get("/:movieId", async (req, res) => {

  try {

    const movieId =
      Number(req.params.movieId);

    const reviews =
      await Review.find({ movieId })

      .sort({ createdAt: -1 });

    // average rating
    const total =
      reviews.reduce(

        (sum, item) =>

          sum + item.rating,

        0
      );

    const averageRating =

      reviews.length > 0

        ? (total / reviews.length)
            .toFixed(1)

        : 0;

    res.json({

      averageRating,

      totalReviews:
        reviews.length,

      reviews
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;