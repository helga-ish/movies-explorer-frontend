import React from "react";
import './MoviesCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { useLocation } from 'react-router-dom';

export default function MoviesCard({ movie, handleSaveMovie, handleRemoveMovie }) { 

    const location = useLocation();
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = movie.owner === currentUser._id;
    const isSaved = movie.isSaved === true;

    // нажатие на кнопку "сохранить", сохранение фильма в нашу БД, затем удаление из нее:

    function handleSaving() {
        handleSaveMovie(movie);
    }

    function handleRemoving() {
       handleRemoveMovie(movie);
    }

    // появление кнопки "сохранить" при наведении на картинку:
    const [showSaveButton, setShowSaveButton] = React.useState(false);
    const handleShowButton = (e) => {
        setShowSaveButton(true);
    };

    const handleHideButton = (e) => {
        setShowSaveButton(false);
    };

    // переход на трейлер по клику на картинку:
    const handleRedirectionClick = () => {
        window.location.href = movie.trailerLink;
    };

    // смена формата длины фильма:
    function toHoursAndMinutes(totalMinutes) {
        if (totalMinutes < 60) {
            return `${totalMinutes}м`;
        } else {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${hours}ч ${minutes}м`;
        }
      }

      const cardSaveButtonClassName = ( 
        `moviesCard__button ${isSaved && 'moviesCard__button_type_saved'}` 
      );

    return(
        <li className="moviesCard"
        >
            <div
            className="moviesCard__block"
            onMouseEnter = { handleShowButton }
            onMouseLeave = { handleHideButton } 
            >
                <img
                className="moviesCard__image"
                src={ `https://api.nomoreparties.co/${movie.image.url}`}
                alt={ `обложка фильма ${ movie.nameRU }` }
                onClick = { handleRedirectionClick }
                />
                {movie.isSaved ? (
                    <button className={ cardSaveButtonClassName } type="button"/>
                ) : (
                    location.pathname === '/saved-movies' && isOwn ? (
                        <button
                        className="moviesCard__button moviesCard__button_type_remove"
                        type="button"
                        onClick = { handleRemoving }
                        />
                    ) : (
                        showSaveButton && 
                        <button
                        className ={`moviesCard__button moviesCard__button_type_notsaved `}
                        type = "button"
                        onClick = { handleSaving }
                        >
                        Сохранить
                        </button>
                    )
                )}
                {location.pathname === '/saved-movies' && isOwn && <button
                className="moviesCard__button moviesCard__button_type_remove"
                type="button"
                onClick = { handleRemoving }
                />}
            </div>
            
            <div className="moviesCard__container">
                <h2 className="moviesCard__name">{ movie.nameRU }</h2>
                <p className="moviesCard__length">{ toHoursAndMinutes(movie.duration) }</p>
            </div>
        </li>
    )
};

// При клике на иконку «Лайк» в блоке карточки выполняется запрос к /movies нашего API для установки или снятия лайка,
// в зависимости от текущего состояния.
// мб переделать немного логику по аналогии с лайком карточки прошлой работы?