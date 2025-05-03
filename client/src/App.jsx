import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UpdatePassword from './pages/auth/components/UpdatePassword';
import Signup from './pages/auth/signup';
import Navbar from './components/shared/Navbar';
import Login from './pages/auth/Login';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';

const App = () => {
  return (
    <>
      <Navbar />
        <Toaster/>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
    </>
  );
};

export default App;
