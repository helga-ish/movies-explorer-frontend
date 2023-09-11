import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({
    foundMovies,
    isShortOff,
    handleSaveMovie,
    handleRemoveMovie,
    visibleCardCount,
    handleClick,
    savedMovies,
    moviesSliced,
    shortMoviesFilteredAndSliced,
    }) {
    
    const location = useLocation();

    return(
        <section className="moviesCardList">
            {location.pathname === '/movies' ? (
                isShortOff ? (
                <ul className="moviesCardList__gallery">
                    {shortMoviesFilteredAndSliced.map((item) => (
                        <MoviesCard
                        key = { item.movieId }
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
                        key = { item.movieId }
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
                            savedMovies.filter((item) => item.duration >= 40).map((item) => (
                                <MoviesCard
                                key = { item.movieId }
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
                            savedMovies.map((item) => (
                                <MoviesCard
                                key = { item.movieId }
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
