import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfiePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      name: name,
      info: description
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      form={'profileData'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      name={'edit'}
      onSubmit={handleSubmit}
      >
      <input type="text" className="popup__input" id="user-name" name="name" placeholder="Как вас зовут?" required minLength="2" maxLength="40" value={name} onChange={handleNameChange} />
      <span className="popup__form-error" id="user-name-error" />
      <input type="text" className="popup__input" id="user-about" name="info" placeholder="Чем вы занимаетесь?" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
      <span className="popup__form-error" id="user-about-error" />
    </PopupWithForm>
  )
}

export default EditProfiePopup;