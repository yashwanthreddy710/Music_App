import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="p-4 border w-full h-full bg-black text-white flex justify-between items-center">
      <div className="text-xl font-bold lg:text-3xl">
        <h1 className="p-2"><i className="fas fa-music"></i> Music Stream <i className="fas fa-music"></i></h1>
      </div>

      {user ? (
        <div className="flex flex-wrap items-center space-x-2 space-y-2">
          <Link to="/" className="hover:text-gray-200 no-underline border p-2 rounded-lg bg-green-800 text-white w-25">Home</Link>
          <Link to="/playlists" className="hover:text-gray-200 no-underline border p-2 rounded-lg bg-green-800 text-white w-25">Playlists</Link>
          <Link to="/favorites" className="hover:text-blue-400 no-underline border p-2 rounded-lg bg-green-800 text-white w-25">Favorites</Link>
          <Link to="/downloads" className="hover:text-blue-400 no-underline border p-2 rounded-lg bg-green-800 text-white w-25">Downloads</Link>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex gap-2 items-center w-max p-2 rounded-lg w-max bg-green-800 hover: cursor-pointer"
            >
              <i className="fa-solid fa-user border p-2 rounded-2xl"></i>{user.name}
            </button>

            {dropdownOpen && (
              <div className="absolute">
                <button
                  onClick={handleLogout}
                  className="block p-2 rounded-lg border bg-blue-800 w-25 hover:bg-gray-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-x-4 flex justify-between ">
          <Link to="/login" className="hover:text-gray-200 no-underline border px-[10px] py-[5px] rounded-[5px] bg-[green] text-[white]">Login</Link>
          <Link to="/register" className="hover:text-gray-200 no-underline border px-[10px] py-[5px] rounded-[5px] bg-[green] text-[white]">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
