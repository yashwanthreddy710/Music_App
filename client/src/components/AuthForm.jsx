import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="border h-screen  bg-[url('https://png.pngtree.com/background/20210716/original/pngtree-green-light-effect-five-line-music-background-picture-image_1352560.jpg')] bg-cover bg-center">
    <form onSubmit={handleSubmit} className=" p- border mt-20 flex flex-col gap-4 justify-center rounded-lg bg-black text-white p-5 mx-5">
      <h3 className='text-center text-2xl '>Register</h3>
      {!isLogin && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 border rounded-lg"
          value={formData.name}
          onChange={handleChange}
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className=" p-2 border rounded-lg"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className=" p-2 border rounded-lg "
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="m-5 bg-white text-black  rounded-lg h-10 hover: cursor-pointer">
        Register
      </button>
    </form>
    </div>
  );
};

export default AuthForm;
