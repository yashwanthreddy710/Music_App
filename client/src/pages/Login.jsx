import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token && user) {
        // Save token + user in context
        login(token, user);

        // Navigate to Home
        navigate("/");
      } else {
        setError("Invalid server response. Please try again.");
      }

    } catch (err) {
      setError("Invalid credentials");
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="border h-screen bg-[url('https://png.pngtree.com/background/20210716/original/pngtree-green-light-effect-five-line-music-background-picture-image_1352560.jpg')] bg-cover bg-center" >
    <div className="m-auto border mx-5  mt-20 flex flex-col justify-center rounded-lg bg-black text-white pb-10 p-2">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex  p-2 items-center">
          <label type="email" className="block"></label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex p-2 items-center">
          <label type="password" className="block"></label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg "
            required
          />
        </div>

        <button type="submit" className="w-full bg-white text-black p-2 rounded-lg hover: cursor-pointer">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
