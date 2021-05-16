import heart from '../images/heart.svg';
import trashcan from '../images/trashcan.svg';
import React from 'react';
import currentUserContext from '../contexts/CurrentUserContext.js';
function Card(props) {
  const currentUser = React.useContext(currentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const deleteButtonClassName = `photocards__delete-button button ${
    isOwn ? 'photocards__delete-button__visible' : ''
  }`;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `photocards__likeimg ${
    isLiked ? 'photocards__likeimg-fill' : ''
  }`;
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleCardClick() {
    props.onCardClick(props.card);
    props.onSelectedCard();
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div>
      <div className="photocards__item">
        <button onClick={handleCardClick} type="button" className="photocards__photo-button button">
          <img className="photocards__photo" src={props.link} alt={`Фото ${props.name}`} />
        </button>
        <button type="button" onClick={handleDeleteClick} className={deleteButtonClassName}>
          <img className="photocards__trashcan" src={trashcan} alt="Удалить" />
        </button>
        <div className="photocards__name-like-area">
          <h2 className="  photocards__place-name">{props.name}</h2>
          <button
            type="button"
            onClick={handleLikeClick}
            className="photocards__like-button  button"
          >
            <img className={cardLikeButtonClassName} src={heart} alt="Сердечко" />
            <p className="photocards__likes">{props.likes}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Card;
