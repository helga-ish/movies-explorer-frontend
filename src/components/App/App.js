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
import * as mainApi from '../../utils/MainApi';
import ProtectedRoute from '../../utils/protectRoute';
import * as movieApi from '../../utils/MoviesApi';


function App() {
  const navigate = useNavigate();
  // const location = useLocation();

  // loggedIn стейт
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
      setLoggedIn(true);
  }
  
  // проверка token

  React.useEffect(() => {
    checkToken();
  }, [])

  const checkToken = () => {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        mainApi.getEmail(token)
        .then(() => {
            handleLogin();
            navigate('/movies', {replace: true})
        })
        .catch((error) => {
          console.error('При авторизации произошла ошибка.')
        });
      }
  }

  // получение информации о пользователе на странице профиля
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    mainApi.getProfileUserInfo()
    .then((userData) => {
        setCurrentUser(userData.data);
    })
    .catch((error) => {
        console.error(`Ошибка загрузки данных пользователя с сервера: ${error}`);
    })
  }, [loggedIn]);

  // update информации о пользователе на странице профиля

  const [isError, setIsError] = React.useState(false);
  function handleIsError() {
      setIsError(true);
  }
  function handleIsNoError() {
      setIsError(false);
  }

  function handleUpdateUser(object) {
    mainApi.changeProfileUserInfo(object)
    .then((newUserData) => {
        handleIsNoError();
        setCurrentUser(newUserData.data)
    })
    .catch((error) => {
        handleIsError();
        console.error(`Ошибка загрузки данных пользователя с сервера: ${error}`);
    })
  }

  // signout на странице профиля
  function handleSignOut() {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/signin', {replace: true});
      localStorage.removeItem('searchResults');
      localStorage.removeItem('searchWord');
      localStorage.removeItem('toggleOff');
      localStorage.removeItem('shortOff');
  }

  // получение сохраненных фильмов с апи
  function getSavedMovies(setSavedMoviesFunction) {
    setIsLoading(true)
    mainApi.getSavedMovies()
    .then((items) => {
      setSavedMoviesFunction(
            items.data.map((item) => ({
                owner: item.owner,
                country: item.country,
                director: item.director,
                duration: item.duration,
                year: item.year,
                description: item.description,
                image: item.image,
                trailerLink: item.trailerLink,
                nameRU: item.nameRU,
                nameEN: item.nameEN,
                thumbnail: item.thumbnail,
                movieId: item.movieId,
            }))
        )
    })
    .catch((error) => {
        setIsServerError(true);
        console.error(`Ошибка загрузки данных с сервера: ${error}`);
    })
    .finally(() => {
        setIsLoading(false);
    });
  }

  // загрузка найденных фильмов с апи фильмов для /movies
  const fetchAllMovies = (filterParam) => {
    movieApi.getAllMovies()
    .then((data) => {
      setIsLoading(true)
      setIsError(false);
      const filteredData = data.filter((item) => item.nameRU.toLowerCase().includes(filterParam.toLowerCase()));
      localStorage.setItem(('searchResults'), JSON.stringify(
              filteredData.map((item) => ({
                  country: item.country,
                  director: item.director,
                  duration: item.duration,
                  year: item.year,
                  description: item.description,
                  image: item.image,
                  trailerLink: item.trailerLink,
                  nameRU: item.nameRU,
                  nameEN: item.nameEN,
                  thumbnail: item.thumbnail,
                  movieId: item.id,
              }))
      ))
      if(filteredData.length === 0) {
          setIsEmpty(true);
      }
      localStorage.setItem('searchWord', filterParam);
    })
    .catch((error) => {
        setIsError(true);
        console.log(`Ошибка загрузки данных с сервера: ${error}`);
    })
    .finally(() => {
        setIsLoading(false);
    })
  }

  // прелоадер
  const [isLoading, setIsLoading] = React.useState(false);

  // ошибка при загрузке фильмов
  const [isServerError, setIsServerError] = React.useState(false);

  // стейт для пустого результата поиска
  const [isEmpty, setIsEmpty] = React.useState(false);

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

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path='/profile' element={
              <Profile
              onUpdateUser = { handleUpdateUser }
              onSignOut = { handleSignOut }
              isError = { isError }
              />
            } />

            <Route path='/movies' element={
              <Movies
              getSavedMovies = { getSavedMovies }
              fetchAllMovies = { fetchAllMovies }
              isLoading = { isLoading }
              isServerError = { isServerError }
              isEmpty = { isEmpty }
              />
            } />

            <Route path='/saved-movies' element={
              <SavedMovies
              getSavedMovies = { getSavedMovies }
              isLoading = { isLoading }
              isServerError = { isServerError }
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
