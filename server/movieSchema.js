const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  ID: { type: Number, required: true },
  MOVIE_NAME: { type: String, required: true },
  IMDb_RATINGS: { type: Number, required: true },
  ROTTEN_TOMATOES_RATING: { type: String, required: true },
  RELEASE_DATE: { type: Date, required: true },
  OFFICIAL_LANGUAGE: { type: String, required: true },
  AWARD_WON: { type: String, enum: ['YES', 'NO'], required: true },
  createdBy:{type:String}
});

const Movie = mongoose.model('Movie', movieSchema,'movie_info');

module.exports = Movie;
