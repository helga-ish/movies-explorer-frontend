import { Link } from "react-router-dom";

export default function Form({name, title, formQuestion, pathLink, textLink, buttonTitle, onSubmit, onChange, formValueEmail, formValuePassword, children}) {
    <section className='authentification' id={name}>
        <div className='authentification__container'>
            <form className="form" name={`${name}Form`} onSubmit={ onSubmit }>
                <h2 className="form__heading">{`${title}`}</h2>
                <fieldset className="form__fields">
                    {children}
                    <input
                        type='email'
                        className="form__field form__field_type_email" 
                        id="email" 
                        name="email"
                        placeholder="E-mail" 
                        minLength="8" 
                        required 
                        onChange={onChange}
                        value={formValueEmail}
                    />

                    <span className='form__field-error email-input-error'></span>

                    <input
                        type='password'
                        className="form__field form__field_type_password" 
                        id="password" 
                        name="password"
                        minLength="8" 
                        maxLength="16" 
                        placeholder="Пароль"  
                        required
                        onChange={onChange}
                        value={formValuePassword}
                    />

                    <span className='form__field-error password-input-error'></span>

                </fieldset>
                <button type="submit" className="form-button form-button_type_white">{ buttonTitle }</button>
                <p className="form__transfer">{ formQuestion }<Link className="form__transfer_type_link" to={ pathLink }>{ textLink }</Link></p>
            </form>
        </div>
</section>
}