import logo from '../images/logo.svg';
import profileLogo from '../images/profileLogo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Header.css';

function Header() {

    const location = useLocation();
    
        return(
            <header className="header">
                
                {location.pathname === '/movies' || '/saved-movies' || '/profile' ? 
                (
                    <div className='header__container'>
                        <img className="logo" src={logo} alt="логотип" />
                        <nav className="header__sign-nav">
                            <Link className='header__link' to="/signup">Регистрация</Link>
                            <Link className='header__link' to="/signin">
                                <button className='header__link_type_signin'>Войти</button>
                            </Link>
                        </nav>
                    </div>
                    ) : 
                    location.pathname === '/' ? (
                        <div className='header__nav'>
                        <img className="logo" src={logo} alt="логотип" />
                    <div className='header__nav-movies'>
                        <Link className='header__link' to="/movies">Фильмы</Link>
                        <Link className='header__link' to="/saved-movies">Сохраненные фильмы</Link>
                    </div>
                        <Link className='header__link header__link-profile' to="/profile">
                            Аккаунт
                            <button className='header__link-profile-button'>
                                <img className="header__link-profile-logo" src={profileLogo} alt="логотип профиля" />
                            </button>
                        </Link>
                    </div>
                    ) : (
                        <div className='header__nav'>
                            <img className="logo" src={logo} alt="логотип" />
                        </div>
                    )
                }
    
                
            </header>
        )
    }
    
    export default Header;