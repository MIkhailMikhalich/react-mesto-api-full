import plus from '../images/plus.svg';
import React from 'react';

function PopupWithForm(props) {
  return (
    <div id="popup" className={`popup popup_type_${props.name} ${props.isOpen && 'popup_visible'}`}>
      <button onClick={props.onClose} className="button popup__overlay" />
      <div className="popup__window">
        <h3 className="popup__heading">{props.title}</h3>
        <button
          onClick={props.onClose}
          type="button"
          className="button button_close popup__close-button"
        >
          {' '}
          <img className="popup__close-button-img" src={plus} alt="крестик" />
        </button>
        <form id="profile-form" name={props.name} className="popup__form">
          {props.children}
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
