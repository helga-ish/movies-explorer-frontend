import '../Form/Form.css';
import './Profile.css';
import React from "react";
import { Link } from 'react-router-dom';

export default function Profile() {

    const [isInEditMode, setIsInEditMode] = React.useState(false);
    function goToEditMode() {
        setIsInEditMode(true);
    }
    function finishEditMode() {
        setIsInEditMode(false);
    }

    // const userName 

    return(
            <section className='profile' id='profile'>
                <form className="form profile__form" name='profileForm'>
                    <h1 className="form__heading profile__form-heading">{`Привет, userName!`}</h1>
                    <fieldset className="form__fields profile__form-fields">
                        <h2 className="form__label profile__form-label" for='text'>Имя</h2>
                        <input
                            type='text'
                            placeholder='Виталий'
                            className={ `form__field form__field_type_name profile__form-field ${isInEditMode ? 'profile__form-field_active' : ''}` } 
                            id="name" 
                            name="name"
                            minLength="2"
                            maxLength="30"
                            required
                        />

                        <h2 className="form__label profile__form-label" for='email'>E-mail</h2>
                        <input
                            type='email'
                            placeholder='pochta@yandex.ru'
                            className={ `form__field form__field_type_email profile__form-field ${isInEditMode ? 'profile__form-field_active' : ''}` } 
                            id="email" 
                            name="email" 
                            minLength="8" 
                            required 
                        />

                    </fieldset>
                    {!isInEditMode ? 
                    (
                    <div className='profile__form-button-list'>
                        <button type="submit" className='profile__form-button' onClick={ goToEditMode }>Редактировать</button>
                        <Link className="profile__form-button" to="/"><button type="submit" className='signout-button'>Выйти из аккаунта</button></Link>
                    </div>
                    ) : (
                        <button type="submit" className='profile__form-button profile__form-button_type_save-changes' onClick={ finishEditMode }>Сохранить</button>
                    )
                    }
                </form>
        </section>
    )
};