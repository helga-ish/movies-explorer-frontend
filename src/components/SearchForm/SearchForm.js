import React from "react";
import './SearchForm.css';
import searchFormIcon from '../../images/searchFormIcon.svg';
import searchFormToggle from '../../images/searchFormToggle.svg';
import searchFormToggleOff from '../../images/searchFormToggleOff.svg';
import useForm from "../../hooks/useForm";
import { useLocation } from "react-router-dom";

export default function SearchForm({ findMovies, setIsShortOff, searchTerm, setSearchTerm, filterSavedMovies }) {

    const location = useLocation();

    React.useEffect(() => {
        setIsToggleOff(JSON.parse(localStorage.getItem('toggleOff')));
    }, [])

    const stateSchema = {
        query: { value: '', error: ''},
    };

    const validationStateSchema = {
        query: {
        //   required: true,
          validator: {
            regEx: /^[a-zA-Zа-яА-я- ]{2,30}$/,
            error: 'Нужно ввести ключевое слово.',
          },
        },
      };

      const { state, handleOnChange, handleOnSubmit, disable } = useForm(
        stateSchema,
        validationStateSchema,
        handleSubmit
      );
    
    const handleOnChangeWithSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    function handleSubmit() {
        if(location.pathname === '/movies') {
            findMovies(searchTerm);
        } else if(location.pathname === '/saved-movies') {
            filterSavedMovies(state.query.value)
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
                            handleOnChange(e);
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
                        onChange = { handleOnChange }
                        value = { state.query.value }
                        />
                    )}
                    <input 
                    className="searchForm__button" 
                    type="submit" 
                    value="Найти"
                    disabled = { disable } 
                    onClick = { handleOnSubmit }
                    />
                </fieldset>
                <div className="searchForm__filter">
                    {!isToggleOff && <img className="searchForm__toggle" alt='toggle' src={ searchFormToggle } onClick = { handleToggleOff }/>}
                    {isToggleOff && <img className="searchForm__toggle" alt='toggle' src={ searchFormToggleOff } onClick = { handleToggleOn }/>}
                    <h2 className="searchForm__toggle-name">Короткометражки</h2>
                </div>
            </form>
        </section>
    )
}

// при обновлении и подставлении searchTerm в поисковую строку кнопка Найти не разблокируется, пока не начнешь печатать что-то в поле