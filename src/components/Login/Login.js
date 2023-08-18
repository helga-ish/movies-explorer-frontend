import Form from "../Form/Form";
import React from "react";

export default function Login() {
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
        <Form
            name = 'login'
            title = 'Рады видеть!'
            formQuestion = 'Ещё не зарегистрированы?'
            pathLink = '/signup'
            textLink = 'Регистрация'
            buttonTitle = 'Войти'
            // onSubmit={handleSubmit}
            // onChange={handleChange}
            // formValueEmail={formValue.email}
            // formValuePassword={formValue.password} 
        />
    )
};