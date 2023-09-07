import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import * as movieApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import * as mainApi from '../../utils/MainApi';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useOrientationChange } from "../../hooks/useOrientationChange";

export default function Movies({
    getSavedMovies,
    foundMovies,
    isLoading,
    isServerError,
    isEmpty,
    fetchAllMovies,
    updateFoundMovies,
    handleSaveMovie,
    savedMovies,
    setFoundMovies
    }) { 

    // загрузка данных из localStorage при монтировании страницы
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        console.log('mounting');
        const savedSearchMovies = JSON.parse(localStorage.getItem('searchResults'));
        if(savedSearchMovies) {
            setFoundMovies(savedSearchMovies);
        }
        const savedSearchTerm = localStorage.getItem('searchWord');
        if (savedSearchTerm) {
            setSearchTerm(savedSearchTerm);
        };
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
  
    // const cardColumnCount = isDesktop
    //   ? LG_ROW_CARD_COUNT
    //   : isTablet
    //   ? MD_ROW_CARD_COUNT
    //   : SM_ROW_CARD_COUNT;
  
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
    
    // useOrientationChange(() => {
    //     calculateCardCount();
    // });
    
    const calculateCardCount = () => {
    if (isDesktop) {
        return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }
    if (isTablet) {
        return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }
    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
    }

    // стейт для короткометражек
    const [isShortOff, setIsShortOff] = React.useState(false);

    // поиск фильмов
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
                                    savedMovies = { savedMovies }
                                />
                                )
                            )
                        )
                }
            </section>
        </main>
    )
}