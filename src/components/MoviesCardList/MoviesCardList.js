import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

export default function MoviesCardList() {
    return(
        <section className="moviesCardList">
            <ul className="moviesCardList__gallery">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
            <button type="button" className="moviesCardList__showmore">Ещё</button>
        </section>
    )
};