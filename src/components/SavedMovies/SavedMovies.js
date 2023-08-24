import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import * as api from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ loggedIn }) {

        // loading
        const [isLoading, setIsLoading] = React.useState(false);

        // error instead of data
        const [isError, setIsError] = React.useState(false);
    
        // getting movies
        const [movies, setMovies] = React.useState([]);
    
        React.useEffect(() => {
            setIsLoading(true);
            api.getAllMovies()
            .then((data) => {
                setMovies(
                    data.map((item) => ({
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
                        thumbnail: item.image,
                        movieId: item.id,
                    }))
                )
            })
            .catch((error) => {
                console.error(`Ошибка загрузки данных с сервера: ${error}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }, [loggedIn])
        
        const findMovies = (filterParam) => {
            setIsLoading(true);
            api.getAllMovies()
            .then((data) => {
                setIsError(false);
                setMovies(
                    data.filter((item) => item.nameRU.toLowerCase().includes(filterParam.toLowerCase())).map((item) => ({
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
            <section className="saved-movies">
                <SearchForm
                    findMovies = { findMovies }
                />
                {isLoading ? (
                    <Preloader />
                    ) : (
                    isError ? (
                        <h2 className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
                    ) : (
                        <MoviesCardList
                            movies = { movies }
                        />
                        )
                    )
                }
            </section>
        </main>
    )
};