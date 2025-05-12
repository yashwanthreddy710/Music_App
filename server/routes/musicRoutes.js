const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

// Add new songs
router.post('/songs', musicController.addSongs);

// Get all songs (with optional genre filter)
router.get('/songs', musicController.getAllSongs);

// Update a song
router.put('/songs/:id', musicController.updateSong);

// Get all unique genres
router.get('/songs/genres', musicController.getGenres);

module.exports = router;
