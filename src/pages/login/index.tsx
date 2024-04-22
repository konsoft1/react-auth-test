import React, {useState} from 'react';
import logo from './logo.svg';
import '../../App.css';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";

interface IUser {
  name: string;
  password: string;
}

interface IError {
  nameError: string;
  passwordError: string;
}

export default function Login() {
    const navigate = useNavigate();


  const [user, setUser] = useState<IUser>({
    name: "",
    password: ""
  });
  const [error, setError] = useState<IError>({
    nameError: "",
    passwordError: ""
  });

  let login = (val: any) => {
    val.preventDefault();

    let name = val.target.username.value;
    let password = val.target.password.value;

    let error = {
      nameError: "",
      passwordError: ""
    };

    if (name == "")
      error.nameError = "Name field is required.";
    else if (!(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(name)))
      error.nameError = "Name should contain \"@\" letter.";

    if (password == "")
      error.passwordError = "Password field is required";
    else if (password.length < 4)
      error.passwordError = "Password should be more than 4 letters";

    if (error.nameError != "" || error.passwordError != "") {
      setError(error);
      return;
    }

    setUser({
      name: val.target.username.value,
      password: val.target.username.value
    });

    navigate('/register')
  }

  return (
          <div className="App">
          <form className='login-form' onSubmit={login}>
            <label>Name</label>
            <input type='text' name='username'/>
            {error.nameError == ""? <br/> : <p className='input-error'>{error.nameError}</p>}
            <label>Password</label>
            <input type='password' name='password'/>
            {error.passwordError == ""? <br/> : <p className='input-error'>{error.passwordError}</p>}
            <input type='submit' value='Login'/>
          </form>
          {user.name == ""? '' : <p>Welcome, {user.name}!</p>}
        </div>
  );
}