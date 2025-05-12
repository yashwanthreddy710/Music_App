const Song = require('../models/Song');

// Add multiple songs
exports.addSongs = async (req, res) => {
  try {
    await Song.insertMany(req.body);
    res.status(201).json({ message: 'Songs added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all songs (with optional genre filter)
exports.getAllSongs = async (req, res) => {
  try {
    const { genre } = req.query;
    const filter = genre && genre !== 'all' ? { genre } : {};

    const songs = await Song.find(filter);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a song
exports.updateSong = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedSong = await Song.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json({ message: 'Song updated successfully', song: updatedSong });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all unique genres
exports.getGenres = async (req, res) => {
  try {
    const genres = await Song.distinct('genre');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
