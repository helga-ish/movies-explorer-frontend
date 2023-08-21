import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {

    const location = useLocation();


    const headerClass = `header ${location.pathname === '/' ? 'header_pink' : ''} ${location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/404' ? 'header_disabled' : ''}`
    
        return(
            <header className = { headerClass }>
                <Link to='/'>
                    <img className="header__logo" src={logo} alt="логотип главной страницы" />
                </Link>
                <Navigation />
            </header>
        )
    }
    
    export default Header;