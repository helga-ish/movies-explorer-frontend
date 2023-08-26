import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

export default function MoviesCardList({ moviesToLocalStorage, isShortOff, handleSaveMovie, handleRemoveMovie, savedSearchResults }) {
    


    return(
        <section className="moviesCardList">
            {isShortOff ? (
                <ul className="moviesCardList__gallery">
                    {moviesToLocalStorage.filter((item) => item.duration < 60).map((item) => (
                        <MoviesCard
                        key = { item.id }
                        movie = { item }
                        handleSaveMovie = { handleSaveMovie }
                        handleRemoveMovie = { handleRemoveMovie }
                         />
                    ))
                }
                </ul>
            ) : (
            <ul className="moviesCardList__gallery">
                {
                    moviesToLocalStorage.map((item) => (
                        <MoviesCard
                        key = { item.id }
                        movie = { item }
                        handleSaveMovie = { handleSaveMovie }
                        handleRemoveMovie = { handleRemoveMovie }
                         />
                    ))
                }
            </ul>
            )}
            {/* <button type="button" className="moviesCardList__showmore">Ещё</button>  */}
        </section>
    )
};

// кнопки Еще не должно быть, если фильмов меньше, чем должно быть на странице: 4 ряда карточек всегда, кроме 320px - 480px - 5 карточек в один ряд
// кнопка появляется, когда количество выходит за допустимое значение
// Ширина 1280px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
// Ширина 768px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
// Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.

// хранение результатов пред поиска в localStorage (удалять при signout), не надо для сохраненных, устанавливать текст в строке поиска и отображат ранее найденные фильмы

// переключатель короткометражек: нужно ли писать "не найдено" при отсутствии короткометражек?

// настроить поиск по англ названиям тоже