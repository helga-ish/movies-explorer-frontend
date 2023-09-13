import React from "react";
import './SearchForm.css';
import searchFormIcon from '../../images/searchFormIcon.svg';
import searchFormToggle from '../../images/searchFormToggle.svg';
import searchFormToggleOff from '../../images/searchFormToggleOff.svg';
import { useLocation } from "react-router-dom";

export default function SearchForm({ findMovies, setIsShortOff, searchTerm, setSearchTerm, filterSavedMovies }) {

    const location = useLocation();

    React.useEffect(() => {
        if(location.pathname === '/movies') {
            setIsToggleOff(JSON.parse(localStorage.getItem('toggleOff')));
        }
    }, [])

    const [searchInput, setSearchInput] = React.useState('');
    const [errorText, setErrorText] = React.useState('');
    
    const handleOnChangeWithSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrorText('');
        if(location.pathname === '/movies') {
            if (searchTerm.trim() === '') {
                setErrorText('Нужно ввести ключевое слово.');
                return;
                };
            findMovies(searchTerm);
        } else if(location.pathname === '/saved-movies') {
            if (searchInput.trim() === '') {
                setErrorText('Нужно ввести ключевое слово.');
                return;
              };
            filterSavedMovies(searchInput);
        }
    }

    // short films filter
    const [isToggleOff, setIsToggleOff] = React.useState(false);
    function handleToggleOff() {
        setIsToggleOff(true);
        setIsShortOff(true);
        localStorage.setItem('toggleOff', true);
        localStorage.setItem('shortOff', true);
    }

    function handleToggleOn() {
        setIsToggleOff(false);
        setIsShortOff(false);
        localStorage.setItem('toggleOff', false);
        localStorage.setItem('shortOff', false);
    }


    function handleToggleOffForSaved() {
        setIsToggleOff(true);
        setIsShortOff(true);
    }

    function handleToggleOnForSaved() {
        setIsToggleOff(false);
        setIsShortOff(false);
    }

    return(
        <section className="search">
             <form className="searchForm" action="/search" method="get">
                <fieldset className='searchForm__container'>
                    <img className="searchForm__icon" alt='searchIcon' src={ searchFormIcon }/>
                    {location.pathname === '/movies' ? (
                        <input
                        className="searchForm__field" 
                        type="text" 
                        name="query" 
                        id="query" 
                        placeholder="Фильм"
                        required 
                        onChange={(e) => {
                            handleOnChangeWithSearchTerm(e);
                        }}
                        value = { searchTerm }
                        />
                    ) : (
                        <input
                        className="searchForm__field" 
                        type="text" 
                        name="query" 
                        id="query" 
                        placeholder="Фильм"
                        required 
                        onChange = {(e) => setSearchInput(e.target.value)}
                        value = { searchInput }
                        />
                    )}
                    <input 
                    className="searchForm__button" 
                    type="submit" 
                    value="Найти"
                    onClick = { handleSubmit }
                    />
                </fieldset>
                {location.pathname === '/movies' ? (
                    <div className="searchForm__filter">
                    {!isToggleOff && <img className="searchForm__toggle" alt='toggle' src={ searchFormToggle } onClick = { handleToggleOff }/>}
                    {isToggleOff && <img className="searchForm__toggle" alt='toggle' src={ searchFormToggleOff } onClick = { handleToggleOn }/>}
                    <h2 className="searchForm__toggle-name">Короткометражки</h2>
                </div>
                ) : (
                    <div className="searchForm__filter">
                    {!isToggleOff && <img className="searchForm__toggle" alt='toggle' src={ searchFormToggle } onClick = { handleToggleOffForSaved }/>}
                    {isToggleOff && <img className="searchForm__toggle" alt='toggle' src={ searchFormToggleOff } onClick = { handleToggleOnForSaved }/>}
                    <h2 className="searchForm__toggle-name">Короткометражки</h2>
                </div>
                )}
                <h2 className="searchForm__error">{ errorText }</h2>
            </form>
        </section>
    )
}