import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';


const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      const { token, user } = res.data;
      
      // Call login from context to handle token storage and fetching user data
      login(token);

      navigate('/');
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return <AuthForm onSubmit={handleRegister} isLogin={false} />;
};

export default Register;
