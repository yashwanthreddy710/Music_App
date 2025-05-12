const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  year: Number,
  audioUrl: String,
  coverImage: String,
});

module.exports = mongoose.model('Song', songSchema);


