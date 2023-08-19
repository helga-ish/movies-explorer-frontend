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

    return(
        <main>
            <section className='profile' id='profile'>
                <form className="form profile__form" name='profileForm'>
                    <h1 className="form__heading profile__form-heading">{`Привет, Виталий!`}</h1>
                    <fieldset className="form__fields profile__form-fields">
                        <label className="form__label profile__form-label" for='name'>Имя</label>
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

                        <label className="form__label profile__form-label" for='email'>E-mail</label>
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
                        <div className='profile__form-button-list_edit'>
                            <span className='profile__form-button-error'>При обновлении профиля произошла ошибка.</span>
                            <button type="submit" className='profile__form-button profile__form-button_type_save-changes' onClick={ finishEditMode }>Сохранить</button>
                        </div>
                        )
                    }
                </form>
            </section>
        </main>
    )
};