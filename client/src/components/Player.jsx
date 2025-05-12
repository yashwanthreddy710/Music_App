import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ songUrl, isPlaying, setIsPlaying }) => {
  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current && songUrl) {
      if (isPlaying) {
        playerRef.current.audio.current.play();
      } else {
        playerRef.current.audio.current.pause();
      }
    }
  }, [songUrl, isPlaying]);

  if (!songUrl) return null; 

  return (
    <div className='border bg-black h-35 mt-5 flex items-center rounded-lg xl:mx-40 '>
    <div className=" mt-4 border border-5 border-green-700 w-[90%] m-auto rounded-lg ">
      <AudioPlayer
        ref={playerRef}
        src={songUrl}
        autoPlay={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
    </div>
  );
};

export default Player;


