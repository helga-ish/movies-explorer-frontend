import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as mainApi from '../../utils/MainApi';

export default function SavedMovies({ 
    isLoading,
    savedMovies,
    isServerErrorForMovies,
    handleRemoveMovie,
    isEmpty,
    setIsEmpty,
    fetchSavedMovies,
    }) {

    const currentUser = React.useContext(CurrentUserContext);

    // short movies filter
    const [isShortOff, setIsShortOff] = React.useState(false);

    React.useEffect(() => {
        console.log('load on saved-movies');
        fetchSavedMovies();
    }, [currentUser._id]);
    

    // найденные фильмы
    const [searchedMovies, setSearchedMovies] = React.useState([]);

    // фильтруем сохраненные  фильмы
    const filterSavedMovies = (filterParam) => {
        console.log('search');
        const filteredMovies = savedMovies.filter((item) => {
            const nameRU = item.nameRU.toLowerCase();
            const nameEN = item.nameEN.toLowerCase();
            const filter = filterParam.toLowerCase();

            return nameRU.includes(filter) || nameEN.includes(filter);              
        });
        setSearchedMovies(
            filteredMovies.map((item) => ({item}))
        );
        console.log(searchedMovies);
        if(filteredMovies.length === 0) {
            setIsEmpty(true);
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
                            isEmpty ? (
                                <h2 className="movies__error">Ничего не найдено.</h2>
                                ) : (
                                <MoviesCardList
                                    savedMovies = { savedMovies }
                                    searchedMovies = { searchedMovies }
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