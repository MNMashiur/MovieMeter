const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

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
  },

  review: {

    type: String,

    required: true
  },

  anonymousName: {

    type: String,

    required: true
  },

  createdAt: {

    type: Date,

    default: Date.now
  }

});

module.exports =
  mongoose.model("Review", reviewSchema);