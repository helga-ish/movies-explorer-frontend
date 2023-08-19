import Form from "../Form/Form";
import '../Form/Form.css';
import React from "react";

export default function Register() {

    // const [formValue, setFormValue] = React.useState({
    //     email: '',
    //     password: '',
    //   })

    
    //   const handleChange = (e) => {
    //     const {name, value} = e.target;
    
    //     setFormValue({
    //       ...formValue,
    //       [name]: value
    //     });
    //   }

    return(
        <main>
            <Form
                name = 'register'
                title = 'Добро пожаловать!'
                formQuestion = 'Уже зарегистрированы?'
                pathLink = '/signin'
                textLink = 'Войти'
                buttonTitle = 'Зарегистрироваться'
                // onSubmit={handleSubmit}
                // onChange={handleChange}
                // formValueEmail={formValue.email}
                // formValuePassword={formValue.password} 
                >
                    <label className="form__label" for='name'>Имя</label>
                    <input
                        type='text'
                        className="form__field form__field_type_name" 
                        id="name" 
                        name="name"
                        minLength="2"
                        maxLength="30"
                        required 
                        placeholder="Имя"
                        // onChange={handleChange}
                        // value={formValue.name}
                    />
                    <span className='form__field-error name-input-error'>Что-то пошло не так...</span>
            </Form>
        </main>

    )
};