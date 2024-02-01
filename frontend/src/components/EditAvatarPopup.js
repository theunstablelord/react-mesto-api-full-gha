import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      avatar_link: ref.current.value
    })
  }

  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  return(
    <PopupWithForm
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      form={'placeData'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      name={'avatar'}
    >
      <input ref={ref} type="url" className="popup__input" id="avatar_link" name="avatar_link" placeholder="Ссылка на картинку" required />
      <span className="popup__form-error" id="avatar-link-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;