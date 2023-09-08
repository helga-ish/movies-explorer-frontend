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
import ProtectedRoute from '../../utils/ProtectedRoute';
import * as movieApi from '../../utils/MoviesApi';


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // loggedIn стейт
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
      setLoggedIn(true);
  }
  
  // проверка token
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
        handleLogin();
        navigate(location.pathname, {replace: true})
    } else {
      navigate('/signin', { replace: true})
    }
  }, [])

  const checkToken = () => {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        mainApi.getEmail(token)
        .then(() => {
            handleLogin();
            navigate('/movies', {replace: true})
        })
        .catch(() => {
          console.error('При авторизации произошла ошибка.')
        });
      }
  }

  // получение информации о пользователе для страницы профиля
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

  // signout на странице профиля
  function handleSignOut() {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/', {replace: true});
      localStorage.removeItem('searchResults');
      localStorage.removeItem('searchWord');
      localStorage.removeItem('toggleOff');
      localStorage.removeItem('shortOff');
  }

  // стейт с найденными фильмами
  const [foundMovies, setFoundMovies] = React.useState([]);

  // обращаемся к апи за сохраненками, чтобы потом сравнить два массива и найти сохраненные для отображения значка сохраненности
  const [savedMovies, setSavedMovies] = React.useState([]);

  // получение сохраненных фильмов с апи
  function getSavedMovies() {
    mainApi.getSavedMovies()
    .then((items) => {
      setIsLoading(true);
      setSavedMovies(
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

  React.useEffect(() => {
    getSavedMovies();
  }, [])

  // прелоадер
  const [isLoading, setIsLoading] = React.useState(false);

  // ошибка при загрузке фильмов
  const [isServerError, setIsServerError] = React.useState(false);

  // стейт для пустого результата поиска
  const [isEmpty, setIsEmpty] = React.useState(false);

  // загрузка фильмов: обращение к апи и добавление найденных фильмов в localStorage
  const fetchAllMovies = (filterParam) => {
    movieApi.getAllMovies()
    .then((data) => {
        setIsEmpty(false);
        setIsLoading(true);
        setIsServerError(false);
        const filteredData = data.filter((item) => {
            const nameRU = item.nameRU.toLowerCase();
            const nameEN = item.nameEN.toLowerCase();
            const filter = filterParam.toLowerCase();

            return nameRU.includes(filter) || nameEN.includes(filter);              
        });
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
        const result = compareArrays(JSON.parse(localStorage.getItem('searchResults')), savedMovies);
        setFoundMovies(result);
        localStorage.setItem('searchWord', filterParam);
        if(result.length === 0) {
            setIsEmpty(true);
        }
    })
    .catch((error) => {
        setIsServerError(true);
        console.log(`Ошибка загрузки данных с сервера: ${error}`);
    })
    .finally(() => {
        setIsLoading(false);
    })
  }

  // сравниваем два массива и добавляем параметр сохранения
  function compareArrays(array1, array2) {
    return array1.map((element1) => {
        const matchingElement = array2.find((element2) => element2.movieId === element1.movieId);
        if (matchingElement) {
        return { ...element1, isSaved: true };
        } else if(!matchingElement) {
          const { isSaved, ...rest } = element1;
          return rest;
        }
    });
  }
  
  // удаление фильма
  function handleRemoveMovie(movie) {
    console.log(movie);
    mainApi.deleteMovie(movie.movieId)
    .then(() => {
      setSavedMovies((state) => state.filter((m) => m.movieId !== movie.movieId));
      const updatedFoundMovies = foundMovies.map((movieInState) => {
        if(movieInState.movieId === movie.movieId) {
          const { isSaved, ...rest} = movieInState;
          return rest;
        }
        return movieInState;
      });
      console.log('Успешно удалено.');
      localStorage.setItem('searchResults', JSON.stringify(updatedFoundMovies));
      setFoundMovies(updatedFoundMovies);
    })
    .catch((error) => {
        console.error(`Ошибка загрузки данных с сервера: ${error}`);
    });
  }

  // добавление фильма в сохраненные
  function handleSaveMovie(movie) {
    console.log(movie);
    mainApi
    .saveMovie(movie)
    .then(() => {
      const updatedFoundMovies = foundMovies.map((movieInState) => {
        if (movieInState.movieId === movie.movieId) {
          return { ...movieInState, isSaved: true };
        }
        return movieInState;
      });
      localStorage.setItem('searchResults', JSON.stringify(updatedFoundMovies));
      setFoundMovies(updatedFoundMovies);
    console.log('Успешно сохранено.');
    })
    .catch((error) => console.error(`Ошибка загрузки данных с сервера: ${error}`));
  }

  // фильтруем сохраненные  фильмы
  const filterSavedMovies = (filterParam) => {
    const filteredMovies = savedMovies.filter((item) => {
        const nameRU = item.nameRU.toLowerCase();
        const nameEN = item.nameEN.toLowerCase();
        const filter = filterParam.toLowerCase();

        return nameRU.includes(filter) || nameEN.includes(filter);              
    });
    setSavedMovies(
        filteredMovies.map((item) => ( item ))
    );
    if(filteredMovies.length === 0) {
        setIsEmpty(true);
    }
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

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path='/profile' element={
              <Profile
              setCurrentUser = { setCurrentUser }
              onSignOut = { handleSignOut }
              />
            } />

            <Route path='/movies' element={
              <Movies
              getSavedMovies = { getSavedMovies }
              foundMovies = { foundMovies }
              setFoundMovies = { setFoundMovies }
              isLoading = { isLoading }
              isServerError = { isServerError }
              isEmpty = { isEmpty }
              fetchAllMovies = { fetchAllMovies }
              handleSaveMovie = { handleSaveMovie }
              savedMovies={ savedMovies }
              />
            } />

            <Route path='/saved-movies' element={
              <SavedMovies
              getSavedMovies = { getSavedMovies }
              isLoading = { isLoading }
              isServerError = { isServerError }
              handleRemoveMovie = { handleRemoveMovie }
              savedMovies = { savedMovies }
              filterSavedMovies = { filterSavedMovies }
              isEmpty = { isEmpty }
              />
            } />

          </Route>

          <Route path='/signin' element={
            !loggedIn ? (
              <Login
              checkToken = { checkToken }
              handleLogin = { handleLogin }/>
            ) : (
              <Navigate to="/" replace />
            )
          } />

          <Route path='/signup' element={
            !loggedIn ? (
              <Register
              checkToken = { checkToken }
              handleLogin = { handleLogin }/>
            ) : (
              <Navigate to="/" replace />
            )
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
