import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {

    return(
        <section className="moviesCardList">
            {movies.length === 0 ? (
                <h2>Ничего не найдено.</h2> // не должно быть на странице при обновлении страницы
            ) : (
            <ul className="moviesCardList__gallery">
                {movies.map((item) => (
                        <MoviesCard
                        key = { item.movieId }
                        movie = { item }
                         />
                    ))
                }
            </ul>
            )}
            <button type="button" className="moviesCardList__showmore">Ещё</button> 
        </section>
    )
};

// кнопки Еще не должно быть, если фильмов меньше, чем должно быть на странице: 4 ряда карточек всегда, кроме 320px - 480px - 5 карточек в один ряд
// кнопка появляется, когда количество выходит за допустимое значение
// Ширина 1280px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
// Ширина 768px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
// Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.

// хранение результатов пред поиска в localStorage (удалять при signout), не надо для сохраненных, устанавливать текст в стркое поиска и отображат ранее найденные фильмы

// переключатель короткометражек: убирать при выкл из поиска фильмы меньше скольки-то минут и возвращать при вкл

// настроить поиск по англ названиям тоже