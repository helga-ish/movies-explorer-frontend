import React from "react";
import './MoviesCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function MoviesCard({ movie }) { 
    // проверить, добавлена ли карточка в сохраненные
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = movie.owner === currentUser._id;

    // нажатие на кнопку "сохранить", смена стейта сохраненности, сохранение фильма в нашу БД, затем удаление из нее:
    const [isSaved, setIsSaved] = React.useState(false);
    function handleSaving() {
        setIsSaved(true);
        // смена иконки сохранение на галочку (галочка не появляется в зависимости от ховера, а всегда на месте)
        // запрос к нашей апи на добавление/сохранение фильма - createMovie, при возвращении в объекте уже будет owner, возвращает объект data: movie

        // на saved-movies - на каждой сохраненной (то есть isOwn) - крестик
    }

    // function handleRemoving() {
    //    setIsSaved(false);
    //  функция для удаления у карточки isOwn после клика по крестику - deleteMovie(movieId), вернет объект удаленного фильма
    // }

    // появление кнопки "сохранить" при наведении на картинку:
    const [isHovered, setIsHovered] = React.useState(false);
    const handleShowButton = (e) => {
        setIsHovered(true);
    };

    const handleHideButton = (e) => {
        setIsHovered(false);
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
        <li className="moviesCard">
            <img
            className="moviesCard__image"
            src={ `https://api.nomoreparties.co/${movie.image.url}`}
            alt={ `обложка фильма ${ movie.nameRU }` }
            onMouseOver = { handleShowButton }
            onMouseLeave = { handleHideButton }
            onClick = { handleRedirectionClick }
            />
            {!isSaved && <button
                className ={`moviesCard__button moviesCard__button_type_notsaved ${isHovered ? 'moviesCard__button_type_visible' : ''}`}
                type = "button"
                onClick = { handleSaving }
                >
                    Сохранить
                </button>}
            {isSaved && 
                <button className="moviesCard__button moviesCard__button_type_saved" type="button"/>
            }
            {isOwn && isSaved && <button className="moviesCard__button moviesCard__button_type_remove" type="button"/>}
            <div className="moviesCard__container">
                <h2 className="moviesCard__name">{ movie.nameRU }</h2>
                <p className="moviesCard__length">{ toHoursAndMinutes(movie.duration) }</p>
            </div>
        </li>
    )
};