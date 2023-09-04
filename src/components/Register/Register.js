import Form from "../Form/Form";
import '../Form/Form.css';
import React from "react";
import * as mainApi from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import useForm from "../../hooks/useForm";

export default function Register() {

    const navigate = useNavigate();

    const stateSchema = {
        name: { value: '', error: ''},
        email: { value: '', error: ''},
        password: { value: '', error: ''},
    };

    const validationStateSchema = {
        name: {
            required: true,
            validator: {
                regEx: /^[a-zA-Zа-яА-я- ]{2,30}$/,
                error: 'Что-то пошло не так...',
            }
        },

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
        mainApi.register(state)
          .then((data) => {
            if(data.token) {
              navigate("/movies", {replace: true})
            }
          })
          .catch((err) => {
            console.log(err);
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
                name = 'register'
                title = 'Добро пожаловать!'
                formQuestion = 'Уже зарегистрированы?'
                pathLink = '/signin'
                textLink = 'Войти'
                buttonTitle = 'Зарегистрироваться'
                onSubmit = { handleOnSubmit }
                onChange = { handleOnChange }
                formValueEmail = { state.email.value }
                formValuePassword = { state.password.value } 
                disable = { disable }
                stateEmailError = { state.email.error }
                statePasswordError = {state.password.error }
                >
                    <label className="form__label" for='name'>Имя</label>
                    <input
                        type = 'text'
                        className = {`form__field form__field_type_name ${ state.name.error ? 'form__field_type_error' : ''}`} 
                        id = "name" 
                        name = "name"
                        minLength = "2"
                        maxLength = "30"
                        required 
                        placeholder = "Имя"
                        onChange = { handleOnChange }
                        formValueName = { state.name.value }
                        stateNameError = {state.name.error }
                    />
                    <span className ={`form__field-error name-input-error ${ state.name.error ? 'form__field-error_active' : ''}`}>{ state.name.error }</span>
            </Form>
        </main>

    )
};