import plus from '../images/plus.svg';
import React from 'react';

function ImagePopup(props) {
  return (
    <div id="popup-photo" className={`popup popup_type_photo ${props.isOpen && 'popup_visible'}`}>
      <button onClick={props.onClose} className="button popup__overlay" />
      <div className="popup__photo-window">
        <button
          onClick={props.onClose}
          type="button"
          className="button button_close popup__photo-close-button"
        >
          {' '}
          <img className="popup__close-button-img" src={plus} alt="крестик" />
        </button>
        <img className="popup__photo-img" src={props.card.link} alt={`Фото ${props.card.name}`} />
        <p className="popup__photo-name">{props.card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
