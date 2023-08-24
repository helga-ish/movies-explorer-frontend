import React from "react";
import './SearchForm.css';
import searchFormIcon from '../../images/searchFormIcon.svg';
import searchFormToggle from '../../images/searchFormToggle.svg';
import searchFormToggleOff from '../../images/searchFormToggleOff.svg';
import useForm from "../../hooks/useForm";

export default function SearchForm({ findMovies, setIsShortOff }) {

    const stateSchema = {
        query: { value: '', error: ''},
    };

    const validationStateSchema = {
        query: {
          required: true,
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

    function handleSubmit() {
        findMovies(state.query.value);
    }

    // short films filter
    const [isToggleOff, setIsToggleOff] = React.useState(false);
    function handleToggleOff() {
        setIsToggleOff(true);
        setIsShortOff(true);
    }

    function handleToggleOn() {
        setIsToggleOff(false);
        setIsShortOff(false);
    }


    return(
        <section className="search">
             <form className="searchForm" action="/search" method="get">
                <fieldset className='searchForm__container'>
                    <img className="searchForm__icon" alt='searchIcon' src={ searchFormIcon }/>
                    <input
                    className="searchForm__field" 
                    type="text" 
                    name="query" 
                    id="query" 
                    placeholder="Фильм"
                    required 
                    onChange={ handleOnChange }
                    value = { state.query.value }
                    />
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
};