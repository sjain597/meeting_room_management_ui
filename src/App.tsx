import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from './Components/AuthModule/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/dashboard" element={<dashboard/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
