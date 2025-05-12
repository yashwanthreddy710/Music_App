import React, { useState, useEffect } from 'react';
import api from '../api/api';
import SongList from '../components/SongList';
import Player from '../components/Player';

const Home = ({ favorites, setFavorites, downloads, setDownloads }) => {
  const [allSongs, setAllSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await api.get('/music/songs');
        setAllSongs(res.data);
      } catch (err) {
        console.error('Error fetching songs:', err);
      }
    };
    fetchSongs();
  }, []);

  // Search filter (by title/artist/album)
  const filteredSongs = allSongs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSongUrl =
    currentSongIndex !== null ? filteredSongs[currentSongIndex]?.audioUrl : null;

  return (
    <div className="p-4 ">
      <div className='border h-80  pb-5 bg-[url("https://c4.wallpaperflare.com/wallpaper/499/928/913/music-notes-wallpaper-preview.jpg")] bg-cover bg-center'>
        <h1 className="text-3xl font-bold mb-5 mt-5 text-center xl:text-4xl">
          Welcome to Music Player
        </h1>

        <input
          type="text"
          placeholder="Search by title, artist, or album"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-3 w-full border rounded-lg bg-white  "
        />

        <h3 className="text-lg m-auto w-2/3 font-semibold mb-4 text-center text-white md:text-2xl lg:text-2xl xl:text-5xl">
          Music can change the world because it can change people
        </h3>
      </div>

      <SongList
        allSongs={filteredSongs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        favorites={favorites}
        setFavorites={setFavorites}
        downloads={downloads}
        setDownloads={setDownloads}
      />

      <Player
        songUrl={currentSongUrl}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      <footer className="bg-black text-white mt-10 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold"><i className="fas fa-music"></i> Music Stream</h2>
            <p className="text-sm text-gray-400">Feel the music. Share the vibe.</p>
          </div>

          <div className="flex space-x-4">
            <a href="/" className="hover:text-blue-400 text-sm">Home</a>
            <a href="/favorites" className="hover:text-blue-400 text-sm">Favorites</a>
            <a href="/downloads" className="hover:text-blue-400 text-sm">Downloads</a>
            <a className="hover:text-blue-400 text-sm">About</a>
          </div>

          <div className="text-xs text-center md:text-right text-lg">
            &copy; Music Player. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;




