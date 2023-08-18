import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';

export default function SavedMovies() {
    return(
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList />
        </section>
    )
};