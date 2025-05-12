import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';

const SongList = ({
  allSongs,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
  favorites,
  setFavorites,
  downloads,
  setDownloads,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState([]);
  // Extract unique genres when allSongs change
  useEffect(() => {
    const uniqueGenres = ['All', ...new Set(allSongs.map((song) => song.genre))];
    setGenres(uniqueGenres);
  }, [allSongs]);

  // Filter by genre
  const filteredSongs =
    selectedGenre === 'All'
      ? allSongs
      : allSongs.filter((song) => song.genre === selectedGenre);

  return (
    <>
    
      {/* Genre dropdown */}
      <div className="flex gap-2 items-center mb-4 border p-3 mt-5 rounded-lg bg-black text-white w-max ">
        <label className="">Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 rounded-sm border bg-black hover:cursor-pointer "
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Song cards */}
      <div className="grid p-3 bg-green-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSongs.map((song, index) => (
          <SongCard
            key={song._id}
            song={song}
            index={index}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            favorites={favorites}
            setFavorites={setFavorites}
            downloads={downloads}
            setDownloads={setDownloads}
          />
        ))}
      </div>
    </>
  );
};

export default SongList;
