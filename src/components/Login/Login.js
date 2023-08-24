import Form from "../Form/Form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as auth from '../../utils/MainApi';
import useForm from "../../hooks/useForm";

export default function Login({ checkToken, handleLogin }) {

    const navigate = useNavigate();

    const [isError, setIsError] = useState(false);
    function handleIsError() {
        setIsError(true);
    }
    function handleIsNoError() {
        setIsError(false);
    }

    const errorButtonState = `${isError ? 'form__field-error_active' : ''}`;

    const stateSchema = {
        email: { value: '', error: ''},
        password: { value: '', error: ''},
    };

    const validationStateSchema = {
        email: {
          required: true,
          validator: {
            regEx: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            error: 'Что-то пошло не так...',
          },
        },
        password: {
          required: true,
          validator: {
            regEx: /^.{8,16}$/,
            error: 'Что-то пошло не так...',
          },
        }
      };

      const handleSubmit = (state) => {
        handleIsNoError();
        auth.login(state.email.value, state.password.value)
          .then((data) => {
            if(data.token) {
              handleLogin();
              checkToken();
              navigate("/movies", {replace: true})
            }
          })
          .catch((err) => {
            console.log(err);
            handleIsError();
            // if (err.status === 500) {
            //     errMessage = 'На сервере произошла ошибка.'
            // } else if (err.status === 404) {
            //     errMessage = 'Страница по указанному маршруту не найдена.'
            // } else if (err.status === 401) {
            //     errMessage = 'Вы ввели неправильный email или пароль.';
            // }
            // console.error(errMessage);
          });
      }

      const { state, handleOnChange, handleOnSubmit, disable } = useForm(
        stateSchema,
        validationStateSchema,
        handleSubmit
      );

    return(
        <main>
            <Form
                name = 'login'
                title = 'Рады видеть!'
                formQuestion = 'Ещё не зарегистрированы?'
                pathLink = '/signup'
                textLink = 'Регистрация'
                buttonTitle = 'Войти'
                onSubmit = { handleOnSubmit }
                onChange = { handleOnChange }
                formValueEmail = { state.email.value }
                formValuePassword = { state.password.value } 
                disable = { disable }
                stateEmailError = { state.email.error }
                statePasswordError = {state.password.error }
                errorButtonState = { errorButtonState }
            />
        </main>
    )
};