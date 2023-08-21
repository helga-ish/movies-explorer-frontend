import { Link } from "react-router-dom";
import './Form.css';
import formLogo from '../../images/logo.svg';
import { useLocation } from 'react-router-dom';

export default function Form({name, title, formQuestion, pathLink, textLink, buttonTitle, onSubmit, onChange, formValueEmail, formValuePassword, children}) {

    const location = useLocation();

    const classButton = `form-button ${location.pathname === '/signin' ? 'button-login' : ''}`;

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
                            className="form__field form__field_type_email" 
                            id="email" 
                            name="email" 
                            minLength="8" 
                            required
                            placeholder="Email"
                            onChange={onChange}
                            value={formValueEmail}
                        />

                        <span className='form__field-error email-input-error'>Что-то пошло не так...</span>

                        <label className="form__label" for='password'>Пароль</label>
                        <input
                            type='password'
                            className="form__field form__field_type_password" 
                            id="password" 
                            name="password"
                            minLength="8" 
                            maxLength="16" 
                            required
                            placeholder="Пароль"
                            onChange={onChange}
                            value={formValuePassword}
                        />

                        <span className='form__field-error password-input-error'>Что-то пошло не так...</span>

                    </fieldset>
                    <button type="submit" className={ classButton }>{ buttonTitle }</button>
                    <p className="form__transfer">{ formQuestion }<Link className="transfer-link" to={ pathLink }>{ textLink }</Link></p>
                </form>
            </div>
        </section>
    )
}