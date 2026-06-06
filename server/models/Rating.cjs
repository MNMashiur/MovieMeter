const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({

  movieId: {
    type: Number,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }

});

module.exports = mongoose.model("Rating", ratingSchema);