import React from "react";
import './MoviesCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { useLocation } from 'react-router-dom';

export default function MoviesCard({ movie, handleSaveMovie, handleRemoveMovie }) { 

    const location = useLocation();

    // стейт с сохраненными карточками
    const [savedCards, setSavedCards] = React.useState([]);

    const handleSaveClick = (id) => {
        if (savedCards.includes(id)) {
        setSavedCards(savedCards.filter(cardId => cardId !== id));
        } else {
        setSavedCards([...savedCards, id]);
        }
    };
    
    const isCardSaved = (id) => savedCards.includes(id);

    // проверить, добавлена ли карточка в сохраненные
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = movie.owner === currentUser._id;

    // нажатие на кнопку "сохранить", смена стейта сохраненности, сохранение фильма в нашу БД, затем удаление из нее:

    function handleSaving() {
        handleSaveMovie(movie);
        handleSaveClick(movie.movieId)

        // смена иконки сохранение на галочку (галочка не появляется в зависимости от ховера, а всегда на месте)

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
                    <button className="moviesCard__button moviesCard__button_type_saved" type="button"/>
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

// несохранение статуса карточки, которая подгружается с апи