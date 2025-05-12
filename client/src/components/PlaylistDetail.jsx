import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const PlaylistDetail = ({ playlist, onBack }) => {
  const [songs, setSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSongs(playlist.songs || []);
  }, [playlist]);

  useEffect(() => {
    const fetchAllSongs = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/music/songs');
        setAllSongs(res.data);
      } catch (err) {
        setError('Error fetching songs.');
        console.error('Error fetching all songs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllSongs();
  }, []);

  const addSong = async () => {
    if (!selectedSongId) return;
    setLoading(true);
    setError('');
    try {
      await axios.post(`/playlists/${playlist._id}/addSong`, {
        songId: selectedSongId,
      });
      setSongs((prevSongs) => [
        ...prevSongs,
        allSongs.find((song) => song._id === selectedSongId),
      ]);
      setSelectedSongId('');
    } catch (err) {
      setError('Error adding song.');
      console.error('Error adding song:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeSong = async (songId) => {
    setLoading(true);
    setError('');
    try {
      await axios.post(`/playlists/${playlist._id}/removeSong`, {
        songId,
      });
      setSongs((prevSongs) => prevSongs.filter((song) => song._id !== songId));
    } catch (err) {
      setError('Error removing song.');
      console.error('Error removing song:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg mb-6 border bg-white ">
      <button
        onClick={onBack}
        className="text-white border bg-black p-3 mb-5 rounded-sm hover: cursor-pointer"
        aria-label="Back to playlists"
      >
         Back to Playlists
      </button>
      <h2 className="text-2xl font-bold mb-4 underline">{playlist.name}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex items-center gap-2 mb-4">
        <select
          value={selectedSongId}
          onChange={(e) => setSelectedSongId(e.target.value)}
          className="p-2 border rounded-lg w-[85%] "
        >
          <option value="">Select Song to Add</option>
          {allSongs.map((song) => (
            <option key={song._id} value={song._id}>
              {song.title} - {song.artist}
            </option>
          ))}
        </select>
        <button
          onClick={addSong}
          className="bg-green-700 text-white px-3 py-2 rounded-sm hover: cursor-pointer"
          disabled={loading}
          aria-label="Add selected song to playlist"
        >
          {loading ? 'Adding...' : 'Add Song'}
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2 ">Songs in Playlist :</h3>
      {songs.length === 0 ? (
        <p>No songs in this playlist.</p>
      ) : (
        <ol className="space-y-2">
          {songs.map((song) => (
            <li
              key={song._id}
              className="flex justify-between items-center bg-gray-200 p-2 rounded-sm"
            >
            
              <div className=''>
                {song.title} - {song.artist}
              </div>
              <button
                onClick={() => removeSong(song._id)}
                className="text-red-600 rounded-lg mx-10 border p-1 hover: cursor-pointer"
                aria-label={`Remove ${song.title} from playlist`}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default PlaylistDetail;