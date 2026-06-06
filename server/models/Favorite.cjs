const mongoose = require("mongoose");

const favoriteSchema =
  new mongoose.Schema({

    userId: {

      type:
        mongoose.Schema.Types.ObjectId,

      required: true
    },

    movieId: {

      type: Number,

      required: true
    },

    movieData: {

      type: Object,

      required: true
    }

  });

module.exports =
  mongoose.model(
    "Favorite",
    favoriteSchema
  );