const express = require('express');
const router = express.Router();
const {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist
} = require('../controllers/playlistController');

router.post('/', createPlaylist);
router.get('/', getAllPlaylists);
router.get('/:id', getPlaylist);
router.post('/:id/addSong', addSongToPlaylist);
router.post('/:id/removeSong', removeSongFromPlaylist);
router.delete('/:id', deletePlaylist);

module.exports = router;
