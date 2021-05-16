import React from 'react';
import plus from '../images/plus.svg';

function EditAvatarPopup(props) {
  const imputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: imputRef.current.value,
    });
  }
  React.useEffect(() => {
    if (!props.isOpen) {
      imputRef.current.value = '';
    }
  });
  return (
    <div id="popup" className={`popup popup_type_changeavatar ${props.isOpen && 'popup_visible'}`}>
      <button onClick={props.onClose} className="button popup__overlay" />
      <div className="popup__window">
        <h3 className="popup__heading">Обновить аватар</h3>
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
            ref={imputRef}
            name="second"
            id="profile-avatar"
            placeholder="Ссылка"
            type="url"
            className=" popup__input popup__second-input popup__avatar-link"
            required
            noValidate
          />
          <span id="profile-avatar-error" className="popup__error-message" />
          <button
            onClick={handleSubmit}
            type="submit"
            className="popup__save-button popup__save-button_disabled button"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditAvatarPopup;
