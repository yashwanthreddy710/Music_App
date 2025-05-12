import React, { useState, useEffect } from 'react';
import axios from '../api/api';
import PlaylistList from '../components/PlaylistList';
import PlaylistDetail from '../components/PlaylistDetail';

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  // Fetch playlists on mount
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get('/playlists');
        setPlaylists(res.data);
      } catch (err) {
        console.error('Error fetching playlists:', err);
      }
    };
    fetchPlaylists();
  }, []);

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylistId(playlist._id);
  };

  const handleBackToList = () => {
    setSelectedPlaylistId(null);
  };

  return (
    <div className="p-4 border h-screen bg-[url('https://c4.wallpaperflare.com/wallpaper/499/928/913/music-notes-wallpaper-preview.jpg')] bg-cover bg-center">
      <h1 className="text-3xl font-bold mb-6 text-center"> Playlist Management</h1>

      {selectedPlaylistId ? (
        <PlaylistDetail
          playlist={playlists.find((p) => p._id === selectedPlaylistId)}
          onBack={handleBackToList}
        />
      ) : (
        <PlaylistList playlists={playlists} onSelectPlaylist={handleSelectPlaylist} />
      )}
    </div>
  );
};

export default PlaylistPage;
