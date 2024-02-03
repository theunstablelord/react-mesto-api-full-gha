import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfiePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/api";
import * as auth from "../utils/auth";

import confirm from "../images/confirm.svg";
import fail from "../images/fail.svg";

function App() {
  const navigate = useNavigate()
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlaceAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [emailName, setEmailName] = useState(null)
  const [popupImage, setPopupImage] = useState("")
  const [popupTitle, setPopupTitle] = useState("")
  const [infoToolTip, setInfoToolTip] = useState(false)

  function onRegister(email, password) {
    auth.registerUser(email, password).then(() => {
      setPopupImage(confirm);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoToolTip);
  }

  function onLogin(email, password) {
    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmailName(email);
      navigate("/");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoToolTip();
    })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmailName(res.user.email);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user.user);
        setCards(cards.reverse());
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
  
    if (!isLiked) {
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  function handleUpdateUser(data) {
    api.editProfile(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleAvatarUpdate(data) {
    api.updateProfileAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleInfoToolTip() {
    setInfoToolTip(true);
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddPlaceAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoToolTip(false);
  }
  
  useEffect(() => {
    if (infoToolTip || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [infoToolTip, isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard])

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes> 
          <Route path="/sign-in" element={
            <>
            <Header title="Регистрация" route="/sign-up"/>
            <Login onLogin={onLogin} />
            </>
          }/>

          <Route path="/sign-up" element={
            <>
            <Header title="Войти" route="/sign-in"/>
            <Register onRegister={onRegister} />
            </>
          }/>

          <Route exact path="/" element={
            <>
              <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
              <ProtectedRoute
                component={Main}
                isLogged={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </>
          } />

          <Route path="*" element={< Navigate to={isLoggedIn ? "/" : "/sign-in"}/>} />
        </Routes>

        <EditProfiePopup 
          isOpen={isEditProfilePopupOpen}
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
          onSubmit={handleAvatarUpdate}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
        />

        <InfoToolTip 
          image={popupImage}
          title={popupTitle}
          isOpen={infoToolTip}
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
        />
      </div>
     </CurrentUserContext.Provider>
  );
}

export default App;