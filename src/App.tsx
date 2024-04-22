import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Login from './pages/login/index'
import Register from './pages/register/register';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
