import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register.js';

function App() {
  return (
    <div className='page'>
      <Header />
      <Routes>
        <Route path='/' element={
          <Main />
        }></Route>
        <Route path="/signin" element={
          <Login />
        } />
         <Route path="/signup" element={
          <Register />
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
