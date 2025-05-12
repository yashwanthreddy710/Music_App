import React, { useState } from 'react';
import SongCard from '../components/SongCard';
import Player from '../components/Player';

const DownloadsPage = ({ downloads, setDownloads }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSongUrl =
    currentSongIndex !== null ? downloads[currentSongIndex]?.audioUrl : null;

  return (
    <div className="p-4 border h-screen bg-[url('https://c4.wallpaperflare.com/wallpaper/499/928/913/music-notes-wallpaper-preview.jpg')] bg-cover bg-center">
      <h2 className="text-2xl font-semibold mb-4 text-[white] text-center">Downloaded Songs</h2>

      {downloads.length === 0 ? (
        <p className="text-white">No songs downloaded.</p>
      ) : (
        <div className="grid gap-6 m-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {downloads.map((song, index) => (
            <SongCard
              key={song._id}
              song={song}
              index={index}
              downloads={downloads}
              setDownloads={setDownloads}
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          ))}
        </div>
      )}

      <Player
        songUrl={currentSongUrl}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default DownloadsPage;
