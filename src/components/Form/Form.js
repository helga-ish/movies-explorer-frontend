import { Link } from "react-router-dom";
import './Form.css';
import formLogo from '../../images/logo.svg';
import { useLocation } from 'react-router-dom';

export default function Form({
    name,
    title,
    formQuestion,
    pathLink,
    textLink,
    buttonTitle,
    onSubmit,
    onChange,
    formValueEmail,
    formValuePassword,
    children,
    disable,
    stateEmailError,
    statePasswordError,
    errorButtonState,
}) {

    const location = useLocation();

    const buttonSpanClassName = `form__field-error ${location.pathname === '/signin' ? 'button-login-error' : 'button-error'}  ${errorButtonState}`;

    return(
        <section className='authentification' id={name}>
            <div className='authentification__container'>
                <Link to='/'>
                    <img className="form-logo" src={formLogo} alt="логотип главной страницы" />
                </Link>
                <form className="form" name={`${name}Form`} onSubmit={ onSubmit }>
                    <h1 className="form__heading">{`${title}`}</h1>
                    <fieldset className="form__fields">
                        {children}
                        <label className="form__label" for='email'>E-mail</label>
                        <input
                            type='email'
                            className={`form__field form__field_type_email ${ stateEmailError ? 'form__field_type_error' : ''}`} 
                            id="email" 
                            name="email" 
                            minLength="8" 
                            required
                            placeholder="Email"
                            onChange={onChange}
                            value={formValueEmail}
                        />

                        <span className={`form__field-error email-input-error ${ stateEmailError ? 'form__field-error_active' : ''}`}>{ stateEmailError }</span>

                        <label className="form__label" for='password'>Пароль</label>
                        <input
                            type='password'
                            className={`form__field form__field_type_password ${ statePasswordError ? 'form__field_type_error' : ''}`} 
                            id="password" 
                            name="password"
                            minLength="8" 
                            maxLength="16" 
                            required
                            placeholder="Пароль"
                            onChange={onChange}
                            value={formValuePassword}
                        />

                        <span className={`form__field-error password-input-error ${statePasswordError ? 'form__field-error_active' : ''}` }>{ statePasswordError }</span>

                    </fieldset>
                    <span className={ buttonSpanClassName }>Что-то пошло не так...</span>
                    <button type="submit" className='form-button' disabled = { disable }>{ buttonTitle }</button>
                    <p className="form__transfer">{ formQuestion }<Link className="transfer-link" to={ pathLink }>{ textLink }</Link></p>
                </form>
            </div>
        </section>
    )
}