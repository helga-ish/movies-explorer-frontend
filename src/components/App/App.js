import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as auth from '../../utils/MainApi';
import ProtectedRoute from '../../utils/protectRoute';
// import * as api from '../../utils/MoviesApi';


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // loggedIn state related
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
      setLoggedIn(true);
  }
  
  // checking token
  const [isTokenRight, setIsTokenRight] = React.useState(false);

  React.useEffect(() => {
    checkToken();
  }, [])

  const checkToken = () => {
      if (localStorage.getItem('token')) {
        handleLogin();
        setIsTokenRight(true);
        navigate(location.pathname, {replace: true});
          // const token = localStorage.getItem('token');
          // auth.getEmail(token).then(() => {
          //         handleLogin();
          // })
          // .catch((error) => console.error('При авторизации произошла ошибка.'));
      } else {
        navigate('/signin', {replace: true});
      }
  }

  // get user info for profile page
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    auth.getProfileUserInfo()
    .then((userData) => {
        setCurrentUser(userData.data);
    })
    .catch((error) => {
        console.error(`Ошибка загрузки данных пользователя с сервера: ${error}`);
    })
  }, [loggedIn]);

  // update user info on the profile page

  const [isError, setIsError] = React.useState(false);
  function handleIsError() {
      setIsError(true);
  }
  function handleIsNoError() {
      setIsError(false);
  }

  function handleUpdateUser(object) {
    auth.changeProfileUserInfo(object)
    .then((newUserData) => {
        handleIsNoError();
        setCurrentUser(newUserData.data)
    })
    .catch((error) => {
        handleIsError();
        console.error(`Ошибка загрузки данных пользователя с сервера: ${error}`);
    })
  }

  // signout on the profile page
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/signin', {replace: true});
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchWord');
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
        loggedIn = { loggedIn }
        />

        <Routes>
          <Route path='/' element={
            <Main />
          } />

          <Route element={<ProtectedRoute isTokenRight={isTokenRight} />}>
            <Route path='/profile' element={
              <Profile
              onUpdateUser = { handleUpdateUser }
              onSignOut = { handleSignOut }
              isError = { isError }
              />
            } />

            <Route path='/movies' element={
              <Movies />
            } />

            <Route path='/saved-movies' element={
              <SavedMovies
              />
            } />

          </Route>

          <Route path='/signin' element={
            <Login
            checkToken = { checkToken }
            handleLogin = { handleLogin }/>
          } />

          <Route path='/signup' element={
            <Register />
          } />

          <Route path="/404" element={
            <Error404 />
          } />

          <Route path='*' element={
            <Navigate to="/404" replace />} />
        </Routes>

        <Footer />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
