import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import * as mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ 
    getSavedMovies,
    isLoading,
    isServerError
    }) {

    // short movies filter
    const [isShortOff, setIsShortOff] = React.useState(false);

    // стейт для пустого результата поиска
    const [isEmpty, setIsEmpty] = React.useState(false);

    // remove
    function handleRemoveMovie(movie) {
        console.log(movie);
        mainApi.deleteMovie(movie.movieId)
        .then(() => {
            setSavedMovies((state) => state.filter(function(m) {
                return m.movieId !== movie.movieId;
            }))
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных с сервера: ${error}`);
        });
    }
    
     // получаем сохраненные фильмы при монтировании страницы
    const [savedMovies, setSavedMovies] = React.useState([]);

    React.useEffect(() => {
        getSavedMovies(setSavedMovies);
    }, [])

    // фильтруем фильмы
    const searchForMovies = (filterParam) => {
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

    //compering ids
    const idsArrayWithSavedMovies = savedMovies.map(item => item.movieId);

    return(
        <main>
            <section className="saved-movies">
                <SearchForm
                    searchForMovies = { searchForMovies }
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
                                idsArrayWithSavedMovies = { idsArrayWithSavedMovies }
                            />
                            )
                        )
                    )
                }
            </section>
        </main>
    )
}