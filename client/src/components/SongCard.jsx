import React from 'react';

const SongCard = ({
  song,
  index,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
  favorites = [],
  setFavorites,
  downloads = [],
  setDownloads
}) => {
  const isFavorited = favorites?.some?.((fav) => fav._id === song._id);
  const isDownloaded = downloads?.some?.((dl) => dl._id === song._id);
  // const isCurrentSong = index === currentSongIndex;
  const isCurrentSongPlaying = index === currentSongIndex && isPlaying;

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav._id !== song._id));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  const handleDownloadToggle = (e) => {
    e.stopPropagation();
    if (isDownloaded) {
      setDownloads(downloads.filter((dl) => dl._id !== song._id));
    } else {
      setDownloads([...downloads, song]);
    }
  };

  const handlePlayButtonClick = (e) => {
    e.stopPropagation();
    if (setCurrentSongIndex && setIsPlaying) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={`relative border m-5 p-5 h-80 cursor-pointer bg-black text-white rounded-lg overflow-hidden hover:cursor-pointer ${
        isCurrentSongPlaying ? 'ring-4 ring-blue-400' : ''
      }`}
    >
      <img
        src={song.coverImage}
        alt={song.title}
        className="w-1/2 h-1/2 m-auto object-contain object-center rounded-[10px] border"
      />
      <div className="p-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <h3 className="text-2xl font-semibold text-center">{song.title}</h3>

          {/* Play button beside title */}
          <button
            onClick={handlePlayButtonClick}
            className={`${
              isCurrentSongPlaying ? 'bg-orange-400' : 'bg-green-500 hover:bg-green-600'
            } text-white px-2 py-1 rounded text-sm`}
          >
            {isCurrentSongPlaying ? 'Playing...' : 'Play'}
          </button>
        </div>

        <p className="text-blue-100 mb-2 text-center">{song.artist}</p>

        <div className="flex justify-between mt-2">
          <button
            onClick={handleFavoriteToggle}
            className={`rounded-sm p-2 hover:cursor-pointer ${
              isFavorited ? 'bg-green-300 text-black' : 'bg-green-600'
            }`}
          >
            {isFavorited ? 'Unfavorite' : 'Favorite'}
          </button>

          <button
            onClick={handleDownloadToggle}
            className={`rounded-sm p-2 hover:cursor-pointer ${
              isDownloaded ? 'bg-blue-500' : 'bg-blue-300 text-black'
            }`}
          >
            {isDownloaded ? 'Downloaded' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
