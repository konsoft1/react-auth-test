import { useState, useRef } from 'react';
import '../../App.css';
import { useNavigate, Link } from "react-router-dom";
import { login, requestLogin } from '../../store/actions/authActions';
import { LOGIN_SUCCESS } from '../../store/contexts/actionTypes';
import { useAppDispatch, useAppSelector } from '../../hook/store';

interface IError {
  emailError: string;
  passwordError: string;
}

export default function Login() {
  const authState = useAppSelector((state) => state.auth)
  const authDispatch = useAppDispatch()

  const navigate = useNavigate()

  const txtEmail = useRef<HTMLInputElement | null>(null)

  const [error, setError] = useState<IError>({
    emailError: "",
    passwordError: ""
  })

  let handleLogin = async (e: any) => {
    e.preventDefault();

    let email = txtEmail.current?.value || '';
    let password = e.target.password.value;

    let error = {
      emailError: "",
      passwordError: ""
    };

    if (email === "")
      error.emailError = "Email field is required.";
    else if (!(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)))
      error.emailError = "Email should contain \"@\" letter.";

    if (password === "")
      error.passwordError = "Password field is required";
    else if (password.length < 4)
      error.passwordError = "Password should be more than 4 letters";

    if (error.emailError !== "" || error.passwordError !== "") {
      setError(error);
      return;
    }

    authDispatch(requestLogin());
    const action = await login(email, password);
    authDispatch(action);
    
    if(action.type === LOGIN_SUCCESS) {
      navigate('/dashboard');
    }
  }

  return (
    <div className="App">
      <form className='login-form' onSubmit={handleLogin}>
        <label>Email</label>
        <input ref={txtEmail} type='text' />
        {error.emailError === "" ? <br /> : <p className='input-error'>{error.emailError}</p>}
        <label>Password</label>
        <input type='password' name='password' />
        {error.passwordError === "" ? <br /> : <p className='input-error'>{error.passwordError}</p>}
        <input type='submit' value='Login' />
        <p>If you don't have your own account, <Link to='/register'>Sign up</Link></p>
      </form>
    </div>
  );
}