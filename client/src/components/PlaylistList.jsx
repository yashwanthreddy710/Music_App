import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const PlaylistList = ({ onSelectPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPlaylists = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/playlists');
      setPlaylists(res.data);
    } catch (err) {
      setError('Error fetching playlists.');
      console.error('Error fetching playlists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async () => {
    if (!name) return;
    try {
      await axios.post('/playlists', { name, description });
      setName('');
      setDescription('');
      fetchPlaylists();
    } catch (err) {
      console.error('Error creating playlist:', err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6 border ">
      <h2 className="text-2xl font-bold mb-4 text-center"> Create Playlists</h2>

      {error && <p className="text-red-500">{error}</p>}
      
      <div className="flex flex-col gap-5 sm:">
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-sm "
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-sm"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 rounded-sm p-2 hover:bg-blue-700 cursor-pointer"
        >
          Create
        </button>
      </div>

      {loading ? (
        <p>Loading playlists...</p>
      ) : (
        <ol className="space-y-2 mt-10">Created PlayLists :
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              className="p-2 bg-green-300 rounded-sm   hover: cursor-pointer"
              onClick={() => {
                console.log('Selected playlist:', playlist);
                onSelectPlaylist(playlist);
              }}
            >
              <h3 className="font-semibold">{playlist.name}</h3>
              <p className="text-sm text-gray-600">{playlist.description}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default PlaylistList;
