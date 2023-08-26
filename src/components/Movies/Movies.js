import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import * as api from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import * as auth from '../../utils/MainApi';

export default function Movies() {

    // const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));



    // adding movie to the saved movies
    function handleSaveMovie(movie) {
        auth.saveMovie(movie)
        .then(() => {
            console.log('Успешно сохранено.');
        })
        .catch((error) => console.error(`Ошибка загрузки данных с сервера: ${error}`));
    }

    // loading
    const [isLoading, setIsLoading] = React.useState(false);

    // error instead of data
    const [isError, setIsError] = React.useState(false);

    // // puttingMovies to LocalStorage
    // const [moviesToLocalStorage, setMoviesToLocalStorage] = React.useState([]);

    // gettingMovies
    const [movies, setMovies] = React.useState([]);

    // empty array
    const [isEmpty, setIsEmpty] = React.useState(false);

    // short movies filter
    const [isShortOff, setIsShortOff] = React.useState(false);

    // api to get films
    const fetchAllMovies = (filterParam) => {
        api.getAllMovies()
        .then((data) => {
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
                        thumbnail: item.image.formats.thumbnail.url,
                        movieId: item.id,
                    }))
            ))
            if(filteredData.length === 0) {
                setIsEmpty(true);
            }
            localStorage.setItem('searchWord', filterParam);
            const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
            setMovies(savedSearchResults);
        })
        .catch((error) => {
            setIsError(true);
            console.log(`Ошибка загрузки данных с сервера: ${error}`);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const findMovies = (filterParam) => {
        setIsLoading(true);
        fetchAllMovies(filterParam);
    }

        // localStorage stuff
        const [searchTerm, setSearchTerm] = React.useState('');

        React.useEffect(() => {
            const savedSearchTerm = localStorage.getItem('searchWord');
            if (savedSearchTerm) {
                setSearchTerm(savedSearchTerm);
              }
              const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
              setMovies(savedSearchResults);
        }, []);

    return(
        <main>
            <section className="movies">
                <SearchForm
                    findMovies = { findMovies }
                    setIsShortOff = { setIsShortOff }
                    searchTerm = { searchTerm }
                    setSearchTerm = { setSearchTerm }
                />
                {isLoading ? (
                    <Preloader />
                    ) : (
                    isError ? (
                        <h2 className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
                        ) : (
                            isEmpty ? (
                                <h2 className="movies__error">Ничего не найдено.</h2>
                                ) : (
                                <MoviesCardList
                                    moviesToLocalStorage = { movies }
                                    isShortOff = { isShortOff }
                                    handleSaveMovie = { handleSaveMovie }
                                />
                                )
                            )
                        )
                }
            </section>
        </main>
    )
};