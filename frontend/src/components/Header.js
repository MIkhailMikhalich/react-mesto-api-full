import logo from '../images/logo.svg';
import React from 'react';

function Header(props) {
  function handleExit() {

    props.onExit();

  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <p className="header__email">{props.email}</p>
      <button className=" button header__exit-button"onClick={handleExit}>
        Выход
      </button>
    </header>
  );
}
export default Header;
