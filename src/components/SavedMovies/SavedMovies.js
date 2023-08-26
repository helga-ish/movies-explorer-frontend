import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import * as auth from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ loggedIn }) {
    // empty array
    const [isEmpty, setIsEmpty] = React.useState(false);

    // short movies filter
     const [isShortOff, setIsShortOff] = React.useState(false);

    // emphasize saved movies for saved buttons
        // const [isSaved, setIsSaved] = React.useState(false);

    // remove
        function handleRemoveMovie(movie) {
            console.log(movie);
            auth.deleteMovie(movie.movieId)
            .then(() => {
                setMovies((state) => state.filter(function(m) {
                    return m.movieId !== movie.movieId;
                }))
                // setIsSaved(false);
            })
            .catch((error) => {
                console.error(`Ошибка загрузки данных с сервера: ${error}`);
            });
        }

    // loading
        const [isLoading, setIsLoading] = React.useState(false);

    // error instead of data
        const [isError, setIsError] = React.useState(false);
    
     // getting movies
        const [movies, setMovies] = React.useState([]);
    
        React.useEffect(() => {
            setIsLoading(true);
            auth.getSavedMovies()
            .then((items) => {
                setMovies(
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
                        thumbnail: item.image.formats.thumbnail.url,
                        movieId: item.movieId,
                    }))
                )
            })
            .catch((error) => {
                setIsError(true);
                console.error(`Ошибка загрузки данных с сервера: ${error}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }, [])

        const findMovies = (filterParam) => {
            setIsLoading(true);
            const filteredMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(filterParam.toLowerCase()));
            setMovies(
                filteredMovies.map((item) => ( item ))
            );
            if(filteredMovies.length === 0) {
                setIsEmpty(true);
            }
            setIsLoading(false);
        }

    return(
        <main>
            <section className="saved-movies">
                <SearchForm
                    findMovies = { findMovies }
                    setIsShortOff = { setIsShortOff }
                />
                {isLoading ? (
                    <Preloader />
                    ) : (
                    isError ? (
                        <h2 className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</h2>
                    ) : (
                        isEmpty ? (
                            <h2 className="movies__error">Ничего не найдено.</h2>
                            ) : (
                            <MoviesCardList
                                movies = { movies }
                                isShortOff = { isShortOff }
                                handleRemoveMovie = { handleRemoveMovie }
                            />
                            )
                        )
                    )
                }
            </section>
        </main>
    )
};