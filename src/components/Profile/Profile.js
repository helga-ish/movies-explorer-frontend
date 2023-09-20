import '../Form/Form.css';
import './Profile.css';
import React from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useForm from "../../hooks/useForm";
import * as mainApi from '../../utils/MainApi';

export default function Profile({ setCurrentUser, onSignOut }) {

    const currentUser = React.useContext(CurrentUserContext);


    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserEmail(currentUser.email);
      }, [currentUser]); 

    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');

    const [isInEditMode, setIsInEditMode] = React.useState(false);
    function goToEditMode() {
        setIsInEditMode(true);
    }
    function finishEditMode() {
        setIsInEditMode(false);
    }

    const stateSchema = {
        name: { value: '', error: ''},
        email: { value: '', error: ''},
    };

    const validationStateSchema = {
        name: {
            validator: {
                regEx: /^[a-zA-Zа-яА-я- ]{2,30}$/,
                error: 'Что-то пошло не так...',
            }
        },

        email: {
            validator: {
            regEx: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            error: 'Что-то пошло не так...',
            },
        },
        };

    const { handleOnChange, handleOnSubmit, disable } = useForm(
        stateSchema,
        validationStateSchema,
        handleSubmit
        );

    // update информации о пользователе на странице профиля
    const [isSaveSuccess, setIsSaveSuccess] = React.useState(false);
    const successMessageDuration = 3000;
    const [isError, setIsError] = React.useState(false);
    function handleIsError() {
        setIsError(true);
    }
    function handleIsNoError() {
        setIsError(false);
    }

    function handleUpdateUser(object) {
        mainApi.changeProfileUserInfo(object)
        .then((newUserData) => {
            handleIsNoError();
            setCurrentUser(newUserData.data);
            finishEditMode();
            setIsSaveSuccess(true);
            setTimeout(() => {
            setIsSaveSuccess(false);
        }, successMessageDuration);
        })
        .catch((error) => {
            handleIsError();
            setIsSaveSuccess(false);
            console.error(`Ошибка загрузки данных пользователя с сервера: ${error}`);
        })
    }

    function handleSubmit(state) {
        handleUpdateUser({
            name: userName,
            email: userEmail,
            })
    }

    const isAtLeastOneChanged = () => {
        return userName !== currentUser.name || userEmail !== currentUser.email;
        };

    return(
        <main>
            <section className='profile' id='profile'>
                <form className="form profile__form" name='profileForm'>
                    <h1 className="form__heading profile__form-heading">{`Привет, ${userName}!`}</h1>
                    <fieldset className="form__fields profile__form-fields">
                        <label className="form__label profile__form-label">Имя</label>
                        <input
                            type='text'
                            placeholder='Имя'
                            className={ `form__field form__field_type_name profile__form-field ${isInEditMode ? 'profile__form-field_active' : ''}` } 
                            id="name" 
                            name="name"
                            minLength="2"
                            maxLength="30"
                            required
                            onChange={(e) => {
                                handleOnChange(e);
                                setUserName(e.target.value)
                            }}
                            value={ userName || '' }
                        />

                        <label className="form__label profile__form-label">E-mail</label>
                        <input
                            type='email'
                            placeholder='E-mail'
                            className={ `form__field form__field_type_email profile__form-field ${isInEditMode ? 'profile__form-field_active' : ''}` } 
                            id="email" 
                            name="email" 
                            minLength="8" 
                            required
                            onChange={(e) => {
                                handleOnChange(e);
                                setUserEmail(e.target.value)
                            }}
                            value={ userEmail || '' }
                        />

                    </fieldset>
                    {!isInEditMode ? 
                    (
                    <div className='profile__form-button-list'>
                        <button type="submit" className='profile__form-button' onClick={ goToEditMode }>Редактировать</button>
                        <Link className="profile__form-button" to="/"><button type="submit" className='signout-button' onClick={ onSignOut }>Выйти из аккаунта</button></Link>
                        {isSaveSuccess && <span className='profile__form-button-success'>Данные профиля успешно обновлены!</span>}
                    </div>
                    ) : (
                        <div className='profile__form-button-list_edit'>
                            <span className={`profile__form-button-error ${isError ? 'profile__form-button-error_active' : ''}`}>При обновлении профиля произошла ошибка.</span>
                            <button
                            type="submit"
                            className='profile__form-button profile__form-button_type_save-changes'
                            onClick={ handleOnSubmit }
                            disabled = { disable || !isAtLeastOneChanged()}>
                                Сохранить
                            </button>
                        </div>
                        )
                    }
                </form>
            </section>
        </main>
    )
};