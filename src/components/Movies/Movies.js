import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import * as movieApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import * as mainApi from '../../utils/MainApi';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useOrientationChange } from "../../hooks/useOrientationChange";

export default function Movies({ getSavedMovies }) {

    // загрузка данных из localStorage при монтировании страницы
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        console.log('mounitng');
        getSavedMovies(setSavedMovies);
        const savedSearchTerm = localStorage.getItem('searchWord');
        if (savedSearchTerm) {
            setSearchTerm(savedSearchTerm);
        }
        const savedSearchMovies = JSON.parse(localStorage.getItem('searchResults'));
        if(savedSearchMovies) {
            const result = compareArrays(savedSearchMovies, savedMovies);
            setFoundMovies(result);
        }
        const shortMoviesState = JSON.parse(localStorage.getItem('shortOff'));
        setIsShortOff(shortMoviesState);
    }, []);


    // отображение нужного числа карточек и дозагрузка с "Еще"
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
    
    useOrientationChange(() => {
        calculateCardCount();
    });
    
    const calculateCardCount = () => {
    if (isDesktop) {
        return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }
    if (isTablet) {
        return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }
    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
    }

    // обращаемся к апи за сохраненками, чтобы потом сравнить два массива и найти сохраненные для отображения значка сохраненности
    const [savedMovies, setSavedMovies] = React.useState([]);

    // добавление фильма в сохраненные
    function handleSaveMovie(movie) {
        mainApi.saveMovie(movie)
        .then(() => {
            console.log('Успешно сохранено.');
        })
        .catch((error) => console.error(`Ошибка загрузки данных с сервера: ${error}`));
    }

    function compareArrays(array1, array2) {
        return array1.map((element1) => {
            const matchingElement = array2.find((element2) => element2.movieId === element1.movieId);
            if (matchingElement) {
            return { ...element1, isSaved: true };
            }
            return element1;
        });
    }

    // стейт с найденными фильмами
    const [foundMovies, setFoundMovies] = React.useState([]);

    // стейт для короткометражек
    const [isShortOff, setIsShortOff] = React.useState(false);

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

    const findMovies = (filterParam) => {
        fetchAllMovies(filterParam);
    }

    // переменные для рендеринга
    const shortMoviesFilteredAndSliced = foundMovies.filter((item) => item.duration > 40).slice(0, visibleCardCount);
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
                        isServerError ? (
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
}