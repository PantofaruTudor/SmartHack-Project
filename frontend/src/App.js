import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default App;