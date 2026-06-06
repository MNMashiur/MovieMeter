const express = require("express");

const router = express.Router();

const Favorite =
  require("../models/Favorite.cjs");

//
// ADD FAVORITE
//
router.post("/", async (req, res) => {

  try {

    const {
      userId,
      movieId,
      movieData
    } = req.body;

    // avoid duplicates
    const existing =
      await Favorite.findOne({

        userId,

        movieId
      });

    if (existing) {

      return res.json({
        message:
          "Already favorited"
      });
    }

    const favorite =
      new Favorite({

        userId,

        movieId,

        movieData
      });

    await favorite.save();

    res.json({
      message:
        "Added to favorites"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

//
// GET USER FAVORITES
//
router.get("/:userId", async (req, res) => {

  try {

    const favorites =
      await Favorite.find({

        userId:
          req.params.userId
      });

    res.json(favorites);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

//
// REMOVE FAVORITE
//
router.delete(
  "/:userId/:movieId",

  async (req, res) => {

    try {

      await Favorite.findOneAndDelete({

        userId:
          req.params.userId,

        movieId:
          req.params.movieId
      });

      res.json({
        message:
          "Favorite removed"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

module.exports = router;