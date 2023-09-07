import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import * as mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ 
    getSavedMovies,
    savedMovies,
    isLoading,
    isServerError,
    handleRemoveMovie,
    filterSavedMovies,
    isEmpty,
    isMovieSaved,
    updateFoundMovies
    }) {

    // short movies filter
    const [isShortOff, setIsShortOff] = React.useState(false);

    React.useEffect(() => {
        getSavedMovies();
    }, [])

    return(
        <main>
            <section className="saved-movies">
                <SearchForm
                    filterSavedMovies = { filterSavedMovies }
                    setIsShortOff = { setIsShortOff }
                />
                {isLoading ? (
                    <Preloader />
                    ) : (
                    isServerError ? (
                        <h2 className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</h2>
                    ) : (
                        isEmpty ? (
                            <h2 className="movies__error">Ничего не найдено.</h2>
                            ) : (
                            <MoviesCardList
                                movies = { savedMovies }
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
}