import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;