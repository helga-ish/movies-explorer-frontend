import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function SavedMovies({ 
    isLoading,
    savedMovies,
    isServerErrorForMovies,
    handleRemoveMovie,
    fetchSavedMovies,
    }) {

    const currentUser = React.useContext(CurrentUserContext);

    // стейт для пустого результата поиска
    const [isSavedMoviesEmpty, setIsSavedMoviesEmpty] = React.useState(false);

    // short movies filter
    const [isShortOff, setIsShortOff] = React.useState(false);

    React.useEffect(() => {
        setSearchThroughSavedMovies(false);
        fetchSavedMovies();
    }, [currentUser._id]);
    

    // найденные фильмы
    const [searchedMovies, setSearchedMovies] = React.useState(savedMovies);
    const [searchThroughSavedMovies, setSearchThroughSavedMovies] = React.useState(false);

    // фильтруем сохраненные  фильмы
    const filterSavedMovies = (filterParam) => {
        setSearchThroughSavedMovies(true);
        setIsSavedMoviesEmpty(false);
        const filteredMovies = savedMovies.filter((item) => {
            const nameRU = item.nameRU.toLowerCase();
            const nameEN = item.nameEN.toLowerCase();
            const filter = filterParam.toLowerCase();

            return nameRU.includes(filter) || nameEN.includes(filter);              
        });
        setSearchedMovies(
            filteredMovies
        );
        if(filteredMovies.length === 0) {
            setIsSavedMoviesEmpty(true);
        }
    }

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
                        isServerErrorForMovies ? (
                            <h2 className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</h2>
                        ) : (
                            isSavedMoviesEmpty ? (
                                <h2 className="movies__error">Ничего не найдено.</h2>
                                ) : (
                                <MoviesCardList
                                    savedMovies = { savedMovies }
                                    searchedMovies = { searchedMovies }
                                    isShortOff = { isShortOff }
                                    handleRemoveMovie = { handleRemoveMovie }
                                    searchThroughSavedMovies = { searchThroughSavedMovies }
                                />
                                )
                            )
                    )
                }
            </section>
        </main>
    )
}