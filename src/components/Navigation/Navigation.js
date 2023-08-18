import React from 'react';
import profileLogo from '../../images/profileLogo.svg';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Navigation() {

    const location = useLocation();

    const headerMoviesLinkClassName = `navigation__link ${location.pathname === '/movies' ? 'navigation__link_active' : ''}`;
    const headerSavedMoviesLinkClassName = `navigation__link ${location.pathname === '/saved-movies' ? 'navigation__link_active' : ''}`;

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return(
            <nav className='navigation'>
                {isLoggedIn ? (
                    <ul className="navigation__main">
                        <li><Link className='navigation__link navigation__link_type_signup' to="/signup">Регистрация</Link></li>
                        <li>
                            <Link className='navigation__link' to="/signin">
                                <button className='navigation__link navigation__link_type_signin'>Войти</button>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <nav className='navigation__list'>
                        <ul className='navigation__links'>
                            <li><Link className={ headerMoviesLinkClassName } to="/movies">Фильмы</Link></li>
                            <li><Link className={ headerSavedMoviesLinkClassName } to="/saved-movies">Сохранённые фильмы</Link></li>
                            <li>
                                <Link className='navigation__link navigation__link-profile' to="/profile">
                                    Аккаунт
                                    <button className='navigation__link-profile-button'>
                                        <img className="navigation__link-profile-logo" src={profileLogo} alt="логотип профиля" />
                                    </button>
                                </Link>
                            </li>
                        </ul>
                        <BurgerMenu />
                    </nav>
                )}
            </nav>
    )
}

