function PopupWithForm(props) {
  return(
    <section className={`popup popup_form_${props.name} ${props.isOpen ? 'popup_opened': '' }`} onMouseDown={props.onCloseClick}>
    <div className="popup__container">
      <button className="popup__close-btn" type="button" title="Закрыть" onClick={props.onClose} />
      <h2 className="popup__title">{props.title}</h2>
      <form className="popup__form popup__form_element_add" name={props.form} onSubmit={props.onSubmit}>
        {props.children}
        <button className="popup__save-btn" type="submit">{props.buttonText}</button>
      </form>
    </div>
  </section>
  )
}

export default PopupWithForm;