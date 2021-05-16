import React, { useState } from 'react';
import currentUserContext from '../contexts/CurrentUserContext.js';
import plus from '../images/plus.svg';

function EditProfilePopup(props) {
  const currentUser = React.useContext(currentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <div id="popup" className={`popup popup_type_profile ${props.isOpen && 'popup_visible'}`}>
      <button onClick={props.onClose} className="button popup__overlay" />
      <div className="popup__window">
        <h3 className="popup__heading">Редактировать профиль</h3>
        <button
          onClick={props.onClose}
          type="button"
          className="button button_close popup__close-button"
        >
          {' '}
          <img className="popup__close-button-img" src={plus} alt="крестик" />
        </button>
        <form id="profile-form" name="profile" className="popup__form">
          <input
            onChange={handleNameChange}
            value={name || ''}
            name="first"
            id="profile-name"
            placeholder="Имя"
            type="text"
            className=" popup__input popup__first-input popup__name-input"
            required
            minLength={2}
            maxLength={40}
            noValidate
          />
          <span id="profile-name-error" className="popup__error-message" />
          <input
            onChange={handleDescriptionChange}
            value={description || ''}
            name="second"
            id="profile-information"
            placeholder="Информация"
            type="text"
            className=" popup__input popup__second-input popup__info-input"
            required
            minLength={2}
            maxLength={200}
            noValidate
          />
          <span id="profile-information-error" className="popup__error-message" />
          <button type="submit" onClick={handleSubmit} className="popup__save-button  button">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

//name="profile" title="Редактировать профиль"
export default EditProfilePopup;
