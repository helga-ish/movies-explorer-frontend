import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import * as api from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
    // loading
    const [isLoading, setIsLoading] = React.useState(false);

    // error instead of data
    const [isError, setIsError] = React.useState(false);

    // getting movies
    const [movies, setMovies] = React.useState([]);

    // empty array
    const [isEmpty, setIsEmpty] = React.useState(false);

    // short movies filter
    const [isShortOff, setIsShortOff] = React.useState(false);

    const findMovies = (filterParam) => {
        setIsLoading(true);
        api.getAllMovies()
        .then((data) => {
            setIsError(false);
            const filteredData = data.filter((item) => item.nameRU.toLowerCase().includes(filterParam.toLowerCase()));
            setMovies(
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
                    thumbnail: item.image,
                    movieId: item.id,
                }))
            )
            if(filteredData.length === 0) {
                setIsEmpty(true);
            }
        })
        .catch((error) => {
            setIsError(true);
            console.log(`Ошибка загрузки данных с сервера: ${error}`);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }


    return(
        <main>
            <section className="movies">
                <SearchForm
                    findMovies = { findMovies }
                    setIsShortOff = { setIsShortOff }
                />
                {isLoading ? (
                    <Preloader />
                    ) : (
                    isError ? (
                        <h2 className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
                        ) : (
                            isEmpty ? (
                                <h2>Ничего не найдено.</h2>
                                ) : (
                                <MoviesCardList
                                    movies = { movies }
                                    isShortOff = { isShortOff }
                                />
                                )
                            )
                        )
                }
            </section>
        </main>
    )
};