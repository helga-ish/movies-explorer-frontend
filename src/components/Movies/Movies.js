import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import * as api from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import * as auth from '../../utils/MainApi';
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function Movies() {
    // card counting

    const LG_ROW_CARD_COUNT = 3;
    const MD_ROW_CARD_COUNT = 2;
    const SM_ROW_CARD_COUNT = 2;

    const LG_INITIAL_CARD_COUNT = 12;
    const MD_INITIAL_CARD_COUNT = 8;
    const SM_INITIAL_CARD_COUNT = 5;

    const isDesktop = useMediaQuery("(min-width: 920px)");
    const isTablet = useMediaQuery("(min-width: 530px)");
  
    const cardColumnCount = isDesktop
      ? LG_ROW_CARD_COUNT
      : isTablet
      ? MD_ROW_CARD_COUNT
      : SM_ROW_CARD_COUNT;
  
    const initialCardCount = isDesktop
      ? LG_INITIAL_CARD_COUNT
      : isTablet
      ? MD_INITIAL_CARD_COUNT
      : SM_INITIAL_CARD_COUNT;
  
    const [visibleCardCount, setVisibleCardCount] = React.useState(
      initialCardCount
    );

    // Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount; //можно не округлять, потому что иначе по пять карточек на мобилке не получается

    const handleClick = () => {
        calculateCardCount();
      };
    
      const calculateCardCount = () => {
        if (isDesktop) {
          return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
        }
    
        if (isTablet) {
          return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
        }
    
        setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);

        }

    // adding movie to the saved movies
    function handleSaveMovie(movie) {
        auth.saveMovie(movie)
        .then(() => {
            console.log('Успешно сохранено.');
        })
        .catch((error) => console.error(`Ошибка загрузки данных с сервера: ${error}`));
    }


    const [savedMovies, getSavedMovies] = React.useState([]);

    React.useEffect(() => {
        auth.getSavedMovies()
        .then((items) => {
            getSavedMovies(
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
            console.error(`Ошибка загрузки данных с сервера: ${error}`);
        })  
    }, [])

    function compareArrays(array1, array2) {
        return array1.map((element1) => {
            const matchingElement = array2.find((element2) => element2.movieId === element1.movieId);
            if (matchingElement) {
            return { ...element1, isSaved: true };
            }
            return element1;
        });
    }



    // loading
    const [isLoading, setIsLoading] = React.useState(false);

    // error instead of data
    const [isError, setIsError] = React.useState(false);

    // gettingMovies
    const [foundMovies, setFoundMovies] = React.useState([]);

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
            setFoundMovies(savedSearchResults);
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

    // save to localStorage
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        const savedSearchTerm = localStorage.getItem('searchWord');
        if (savedSearchTerm) {
            setSearchTerm(savedSearchTerm);
            }
            const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
            const result = compareArrays(savedSearchResults, savedMovies);
            setFoundMovies(result);
    }, [savedMovies]);

    // variables
    const shortMoviesFilteredAndSliced = foundMovies.filter((item) => item.duration < 60).slice(0, visibleCardCount);
    const moviesSliced = foundMovies?.slice(0, visibleCardCount);

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
                                    foundMovies = { foundMovies }
                                    isShortOff = { isShortOff }
                                    handleSaveMovie = { handleSaveMovie }
                                    visibleCardCount = { visibleCardCount }
                                    handleClick = { handleClick }
                                    shortMoviesFilteredAndSliced = { shortMoviesFilteredAndSliced }
                                    moviesSliced = { moviesSliced }
                                />
                                )
                            )
                        )
                }
            </section>
        </main>
    )
};
// Также пользователь может изменять ширину экрана своего устройства.
// Например, переводя телефон из портретной ориентации в альбомную и наоборот. 
// Это событие можно отслеживать с помощью слушателя “resize”.
// Чтобы колбэк-функция слушателя не срабатывала слишком часто, например при изменении ширины экрана в отладчике,
// мы рекомендуем установить setTimeout на вызов этой функции внутри слушателя “resize”.