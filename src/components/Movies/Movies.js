import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';

export default function Movies() {
    return(
        <section className="movies">
            <SearchForm />
            <MoviesCardList />
        </section>
    )
};