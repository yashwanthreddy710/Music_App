import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlaylistPage from "./pages/PlaylistPage";
import FavoritesPage from "./pages/FavoritesPage";
import DownloadsPage from "./pages/DownloadsPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/NavBar';

const AppContent = () => {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper: Get safe key based on user email
  const getKey = (type) => user ? `${type}_${user.email}` : type;

  // Load favorites/downloads from localStorage for the logged-in user
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(getKey('favorites'));
      const storedDownloads = localStorage.getItem(getKey('downloads'));

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }

      if (storedDownloads) {
        setDownloads(JSON.parse(storedDownloads));
      } else {
        setDownloads([]);
      }
    }
  }, [user]);


  useEffect(() => {
    if (user) {
      localStorage.setItem(getKey('favorites'), JSON.stringify(favorites));
    }
  }, [favorites, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(getKey('downloads'), JSON.stringify(downloads));
    }
  }, [downloads, user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home
                songs={songs}
                setSongs={setSongs}
                favorites={favorites}
                setFavorites={setFavorites}
                downloads={downloads}
                setDownloads={setDownloads}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <PrivateRoute>
              <PlaylistPage
                songs={songs}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage
                favorites={favorites}
                setFavorites={setFavorites}
                downloads={downloads}
                setDownloads={setDownloads}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/downloads"
          element={
            <PrivateRoute>
              <DownloadsPage
                downloads={downloads}
                setDownloads={setDownloads}
                favorites={favorites}
                setFavorites={setFavorites}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <div className="w-full">
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
    </div>
  );
};

export default App;

