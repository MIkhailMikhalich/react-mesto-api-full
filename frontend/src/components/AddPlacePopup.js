import React from 'react';
import plus from '../images/plus.svg';

function AddPlacePopup(props)
{
  const nameImputRef = React.useRef();
  const plaseScrImputRef = React.useRef();

  function handleSubmit(e)
  {
    e.preventDefault();

    props.onPlaceSubmit({name:nameImputRef.current.value,link:plaseScrImputRef.current.value})
    nameImputRef.current.value="";
    plaseScrImputRef.current.value="";
  }

  return(
    <div id="popup" className={`popup popup_type_place ${props.isOpen && 'popup_visible'}`}>
      <button onClick={props.onClose} className="button popup__overlay" />
      <div className="popup__window">
        <h3 className="popup__heading">Новое место</h3>
        <button onClick={props.onClose} type="button" className="button button_close popup__close-button"> <img className="popup__close-button-img" src={plus} alt="крестик" /></button>
        <form id="profile-form" name="profile" className="popup__form">
        <input ref={nameImputRef} name="first" id="place-name" placeholder="Название" type="text" className=" popup__input popup__first-input popup__place-name-input" required minLength={2} maxLength={30} noValidate />
          <span id="place-name-error" className="popup__error-message" />
          <input ref={plaseScrImputRef} name="second" id="place-src" placeholder="Ссылка на картинку" type="url" className=" popup__input popup__second-input  popup__src-input" required noValidate />
          <span id="place-src-error" className=" popup__error-message" />
          <button onClick={handleSubmit} type="submit" className="popup__save-button  button">
            Сохранить
        </button>
        </form>
      </div>
    </div>

  )
}
export default AddPlacePopup;
