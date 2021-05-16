import logo from '../images/logo.svg';
import React from 'react';

function Register(props) {
  const [userData, setUserData] = React.useState({
    password: '',
    email: '',
  });

  function handleChange(e){
    const name = e.target.id;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  function handleSubmit(e){
    e.preventDefault();
    props.onRegister(userData.password,userData.email);

  };

  function handleLoginButton() {
    props.onLogin();
  }
  return (
    <div>
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип" />
        <button id="toLogIn" onClick={handleLoginButton} className="button button_sign-up">
          Вход
        </button>
      </header>
      <div>
        <h1 className="login__title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            id="email"
            placeholder="Email"
            type="email"
            className="login__input"
            value={userData.email || ''}
            onChange={handleChange}
          ></input>
          <input
            id="password"
            placeholder="Пароль"
            type="password"
            className="login__input login__input_last"
            value={userData.password || ''}
            onChange={handleChange}
          ></input>
          <button type="submit" className="button login__button">Зарегистрироватся</button>
          <button type="button" onClick={handleLoginButton} className="button register__button-to-login">
            Уже зарегистрированы?Войти
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
