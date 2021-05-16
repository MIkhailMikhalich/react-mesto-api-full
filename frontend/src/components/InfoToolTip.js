import plus from '../images/plus.svg';
import React from 'react';
import passed from '../images/Passed.svg';
import error from '../images/Error.svg';
function InfoTooltip(props) {
  return (
    <div id="infoToolTip" className={`popup popup_type_infoToolTip ${props.isOpen && 'popup_visible'}`}>
      <button onClick={props.onClose} className="button popup__overlay" />
      <div className="popup__window">
      <img src={`${props.isPassed ? passed:error}`} alt={`${props.isPassed ? "Всё ок":"Ой, что-то не так"}`} className="infoToolTip__img"/>
        <h3 className="popup__heading infoToolTip__heading">{props.isPassed? "Вы успешно зарегистрировались!":"Что-то пошло не так!Попробуйте ещё раз."}</h3>
        <button
          onClick={props.onClose}
          type="button"
          className="button button_close popup__close-button">
          <img className="popup__close-button-img" src={plus} alt="крестик" />
        </button>

      </div>
    </div>
  );
}
export default InfoTooltip;
