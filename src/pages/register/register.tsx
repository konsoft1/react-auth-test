import React, { useState } from 'react';
import '../../App.css';
import { useNavigate, Link } from "react-router-dom";

interface IError {
    emailError: string;
    firstNameError: string;
    lastNameError: string;
    passwordError: string;
    confirmError: string;
}

export default function Register() {
    const navigate = useNavigate();

    const [error, setError] = useState<IError>({
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        passwordError: "",
        confirmError: ""
    });

    let register = (val: any) => {
        val.preventDefault();

        let email = val.target.email.value;
        let firstName = val.target.firstName.value;
        let lastName = val.target.lastName.value;
        let password = val.target.password.value;
        let confirm = val.target.confirm.value;

        let error = {
            emailError: "",
            firstNameError: "",
            lastNameError: "",
            passwordError: "",
            confirmError: ""
        };

        if (email == "")
            error.emailError = "Email field is required.";
        else if (!(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)))
            error.emailError = "Email should contain \"@\" letter.";

        if (firstName == "")
            error.firstNameError = "First Name field is required.";
        else if (!(new RegExp(/[a-zA-Z]+/).test(firstName)))
            error.firstNameError = "First Name should be letters.";

        if (lastName == "")
            error.lastNameError = "Last Name field is required.";
        else if (!(new RegExp(/[a-zA-Z]+/).test(lastName)))
            error.lastNameError = "Last Name should be letters.";

        if (password == "")
            error.passwordError = "Password field is required";
        else if (password.length < 4)
            error.passwordError = "Password should be more than 4 letters";

        if (password != confirm)
            error.confirmError = "Confirm password correctly!";

        if (error.emailError != "" || error.firstNameError != "" || error.lastNameError != "" || error.passwordError != "" || error.confirmError != "") {
            setError(error);
            return;
        }

        alert('Registered successfully!');
        navigate('/');
    }

    return (
        <div className="App">
            <form className='login-form' onSubmit={register}>
                <label>Email</label>
                <input type='text' name='email' />
                {error.emailError == "" ? <br /> : <p className='input-error'>{error.emailError}</p>}
                <label>First Name</label>
                <input type='text' name='firstName' />
                {error.firstNameError == "" ? <br /> : <p className='input-error'>{error.firstNameError}</p>}
                <label>Last Name</label>
                <input type='text' name='lastName' />
                {error.lastNameError == "" ? <br /> : <p className='input-error'>{error.lastNameError}</p>}
                <label>Password</label>
                <input type='password' name='password' />
                {error.passwordError == "" ? <br /> : <p className='input-error'>{error.passwordError}</p>}
                <label>Confirm Password</label>
                <input type='password' name='confirm' />
                {error.confirmError == "" ? <br /> : <p className='input-error'>{error.confirmError}</p>}
                <input type='submit' value='Register' />
                <p>If you already have your own account, <Link to='/'>Log in</Link></p>
            </form>
        </div>
    );
}