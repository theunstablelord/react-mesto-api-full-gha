function ImagePopup(props) {
  return(
    <section className={`popup popup_image-view ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
    <div className="popup__container-image">
      <button className="popup__close-btn" type="button" title="Закрыть" onClick={props.onClose} />
      <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} className="popup__image" />
      <h2 className="popup__caption">{props.card ? props.card.name : ''}</h2>
    </div>
    </section>
  )
}

export default ImagePopup;