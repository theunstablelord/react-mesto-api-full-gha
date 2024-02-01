import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  return(
    <PopupWithForm
          isOpen={props.isOpen}
          onCloseClick={props.onCloseClick}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          form={'placeData'}
          title={'Новое место'}
          buttonText={'Создать'}
          name={'add'}
    >
      <input type="text" className="popup__input" id="element-name" name="name" placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleNameChange}/>
      <span className="popup__form-error " id="element-name-error" />
      <input type="url" className="popup__input" id="element-link" name="link" placeholder="Ссылка на картинку" required value={link} onChange={handleLinkChange}/>
      <span className="popup__form-error" id="element-link-error" />
      </PopupWithForm>
  )
}

export default AddPlacePopup;