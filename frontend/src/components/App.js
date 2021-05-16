import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoToolTip.js';
import currentUserContext from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api.js';
import * as auth from '../utils/Auth&Reg';
import Login from './Login.js';
import Register from './Register.js';

function App() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const [userData, setUserData] = useState({
    id: '',
    email: '',
  });
  let history = useHistory();

  React.useEffect(() => {
    tokenCheck();
    if(isLoggedIn){
    api
      .getProfile()
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => console.log(err));
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));}

  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleSelectedCardClick() {
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }
  function handleUpdateUser(data) {
    api
      .setProfileData(data.name, data.about)
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setProfileAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    const deletedId = card._id;
    const isOwn = card.owner === currentUser._id;
    if (isOwn) {
      api
        .deleteCard(card._id)
        .then((data) => {
          setCards((cards) => cards.filter((card) => card._id !== deletedId));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleRegistration(password, email) {
    return auth
      .register({ password, email })
      .then((res) => {
        setIsPassed(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');

        return res;
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    return auth
      .authorize({ password, email })
      .then((data) => {
        history.push('/main');
        setUserData({ email: email });
        localStorage.setItem('jwt', data.token);
        tokenCheck();
        return;
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getContent(jwt)
        .then((data) => {
          setisLoggedIn(true);
          history.push('./main');

          setUserData({ id: data.data._id, email: data.data.email });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleExit() {
    setisLoggedIn(false);
    history.push('./signin');
    localStorage.removeItem('jwt');
  }
  function handleLoginButton() {
    history.push('./signin');
  }
  function handleRegsterButton() {
    history.push('./signup');
  }

  return (
    <Switch>
      <currentUserContext.Provider value={currentUser}>
        <Route path="/signup">
          <Register onLogin={handleLoginButton} onRegister={handleRegistration} />
        </Route>
        <Route path="/signin">
          <Login onRegister={handleRegsterButton} onLogin={handleLogin} />
        </Route>
        <div className="page__content">
          <ProtectedRoute
            path="/main"
            loggedIn={isLoggedIn}
            onExit={handleExit}
            email={userData.email}
            component={Header}
          />

          <ProtectedRoute
            path="/main"
            loggedIn={isLoggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onSelectedCard={handleSelectedCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            component={Main}
          />

          <ProtectedRoute
            path="/main"
            loggedIn={isLoggedIn}
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            component={EditProfilePopup}
          />

          <ProtectedRoute
            path="/main"
            loggedIn={isLoggedIn}
            onPlaceSubmit={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            component={AddPlacePopup}
          />
          <ProtectedRoute
            path="/main"
            loggedIn={isLoggedIn}
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            component={EditAvatarPopup}
          />

          <PopupWithForm name="erase" title="Вы уверены ?" isOpen={false} onClose={closeAllPopup}>
            <button id="agree" className="button popup__save-button popup__agree-button">
              Да
            </button>
          </PopupWithForm>

          <ImagePopup onClose={closeAllPopup} isOpen={isImagePopupOpen} card={selectedCard} />
          <InfoTooltip onClose={closeAllPopup} isOpen={isInfoTooltipOpen} isPassed={isPassed} />
          <ProtectedRoute path="/main" loggedIn={isLoggedIn} component={Footer} />
        </div>
      </currentUserContext.Provider>
    </Switch>
  );
}

export default App;
