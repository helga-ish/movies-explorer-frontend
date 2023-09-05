import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({
    shortMoviesFilteredAndSliced,
    moviesSliced,
    foundMovies,
    isShortOff,
    handleSaveMovie,
    handleRemoveMovie,
    visibleCardCount,
    handleClick,
    movies,
    }) {
    
    const location = useLocation();



    return(
        <section className="moviesCardList">
            {location.pathname === '/movies' ? (
                isShortOff ? (
                <ul className="moviesCardList__gallery">
                    {shortMoviesFilteredAndSliced.map((item) => (
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
                    moviesSliced.map((item) => (
                        <MoviesCard
                        key = { item.id }
                        movie = { item }
                        handleSaveMovie = { handleSaveMovie }
                        handleRemoveMovie = { handleRemoveMovie }
                         />
                    ))
                }
            </ul>
            )) : (
                isShortOff ? (
                        <ul className="moviesCardList__gallery">
                            {
                            movies.filter((item) => item.duration >= 40).map((item) => (
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
                            movies.map((item) => (
                                <MoviesCard
                                key = { item.id }
                                movie = { item }
                                handleSaveMovie = { handleSaveMovie }
                                handleRemoveMovie = { handleRemoveMovie }
                                />
                            )
                            )
                        }
                    </ul>
                    )
                )
            }
            {location.pathname === '/movies' ? (
                (visibleCardCount >= foundMovies.length) ? (
                <></>
            ) : (
                <button type="button" className="moviesCardList__showmore" onClick = { handleClick }>Ещё</button>
            )
        ) : (
            <></>
        )
        }
        </section>
    )
};

// настроить поиск по англ названиям тоже