import React from "react";
import './MoviesCard.css';

export default function MoviesCard() {

    return(
        <li className="moviesCard">
            <img
            className="moviesCard__image"
            src='https://plus.unsplash.com/premium_photo-1673285286254-d0d0e465e0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
            alt='tokyo'
            // далее функции для появления кнопки "сохранить" или крестика удаления карточки по ховеру:
            // onMouseOver={}
            // onMouseOut={}
            />
            <button className="moviesCard__button moviesCard__button_type_notsaved" type="button">Сохранить</button>
            {/* <button className="moviesCard__button moviesCard__button_type_saved" type="button"/> <-- галочка сохраненного фильма, завязывается на стейт карточки */}
            {/* <button className="moviesCard__button moviesCard__button_type_remove" type="button"/> <-- крестик для удаления сохраненного фильма, завязывается на стейт карточки */}
            <div className="moviesCard__container">
                <h2 className="moviesCard__name">Токийские ночи</h2>
                <h3 className="moviesCard__length">1ч 17м</h3>
            </div>
        </li>
    )
};