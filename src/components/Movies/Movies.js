import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function Movies({
    foundMovies,
    isLoading,
    isServerError,
    isEmpty,
    fetchAllMovies,
    handleSaveMovie,
    setFoundMovies,
    handleRemoveMovie,
    }) { 

    // загрузка данных из localStorage при монтировании страницы
    const [searchTerm, setSearchTerm] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        console.log('useEffect on movies');
        const savedSearchMovies = JSON.parse(localStorage.getItem('searchResults'));
        if(savedSearchMovies) {
            setFoundMovies(savedSearchMovies);
        } else {
            setFoundMovies([]);
        }
        const savedSearchTerm = localStorage.getItem('searchWord');
        if (savedSearchTerm) {
            setSearchTerm(savedSearchTerm);
        };
        const shortMoviesState = JSON.parse(localStorage.getItem('shortOff'));
        setIsShortOff(shortMoviesState);
    }, [currentUser._id]);

    // отображение нужного числа карточек и дозагрузка с "Еще"
    const LG_ROW_CARD_COUNT = 3;
    const MD_ROW_CARD_COUNT = 2;
    const SM_ROW_CARD_COUNT = 2;

    const LG_INITIAL_CARD_COUNT = 12;
    const MD_INITIAL_CARD_COUNT = 8;
    const SM_INITIAL_CARD_COUNT = 5;

    const isDesktop = useMediaQuery("(min-width: 920px)");
    const isTablet = useMediaQuery("(min-width: 530px)");
  
    const initialCardCount = isDesktop
      ? LG_INITIAL_CARD_COUNT
      : isTablet
      ? MD_INITIAL_CARD_COUNT
      : SM_INITIAL_CARD_COUNT;
  
    const [visibleCardCount, setVisibleCardCount] = React.useState(
      initialCardCount
    );

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