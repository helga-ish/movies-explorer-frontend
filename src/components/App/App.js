import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Main from '../Main/Main.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import SavedMovies from '../SavedMovies/SavedMovies';
import Error404 from '../Error404/Error404';
// import Preloader from '../Preloader/Preloader';

function App() {
  return (
    <div className='page'>
      <Header />
      <Routes>
        <Route path='/' element={
          <Main />
        }></Route>
        <Route path='/signin' element={
          <Login />
        } />
        <Route path='/signup' element={
          <Register />
        } />
        <Route path='/profile' element={
          <Profile />
        } />
        <Route path='/movies' element={
          <Movies />
        } />
        <Route path='/saved-movies' element={
          <SavedMovies />
        } />
        <Route path='*' element={
          <Error404 />
        } />
      </Routes>
      {/* <Preloader /> */}
      <Footer />
    </div>
  );
}

export default App;
