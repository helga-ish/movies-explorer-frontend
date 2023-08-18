import React from 'react';
import profileLogo from '../../images/profileLogo.svg';
import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.css';

export default function BurgerMenu() {

    const location = useLocation();

    const headerMoviesLinkClassName = `burger-menu__link ${location.pathname === '/movies' ? 'burger-menu__link_active' : ''}`;
    const headerSavedMoviesLinkClassName = `burger-menu__link ${location.pathname === '/saved-movies' ? 'burger-menu__link_active' : ''}`;
    const headerMainLinkClassName = `burger-menu__link ${location.pathname === '/' ? 'burger-menu__link_active' : ''}`;

    const [isActive, setIsActive] = React.useState(false);
    function handleActiveState() {
        setIsActive(true);
    }
    function handleInactiveState() {
        setIsActive(false);
    }

    const navigationToggleClassName = `burger-menu__toggler ${!isActive ? 'burger-menu__toggler_active' : ''}`;
    const burgerMenuClassName = `burger-menu__nav ${!isActive ? 'burger-menu__nav_inactive' : ''}`;
    const burgerMenuContainerClassName = `burger-menu__container ${isActive ? 'burger-menu__container_active' : ''}`;


    return(
        <div className='burger-menu'>
            <button className={ navigationToggleClassName } onClick={!isActive ? handleActiveState : handleInactiveState} />
            <div className={ burgerMenuContainerClassName }>
                <ul className={ burgerMenuClassName }>
                    <li><button type='button' className='burger-menu__cross' onClick={!isActive ? handleActiveState : handleInactiveState} /></li>
                    <li><Link className={ headerMainLinkClassName } to="/" onClick={isActive ? handleInactiveState : '' }>Главная</Link></li>
                    <li><Link className={ headerMoviesLinkClassName } to="/movies" onClick={isActive ? handleInactiveState : '' }>Фильмы</Link></li>
                    <li><Link className={ headerSavedMoviesLinkClassName } to="/saved-movies" onClick={isActive ? handleInactiveState : '' }>Сохранённые фильмы</Link></li>
                    <li>
                        <Link className='burger-menu__link burger-menu__link-profile' to="/profile" onClick={isActive ? handleInactiveState : '' }>
                            Аккаунт
                            <button className='burger-menu__link-profile-button' onClick={isActive ? handleInactiveState : '' }>
                                <img className="burger-menu__link-profile-logo" src={profileLogo} alt="логотип профиля" />
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};
