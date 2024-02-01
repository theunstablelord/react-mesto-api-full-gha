import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteBtnClassName = (
    `element__delete-btn ${isOwn ? 'element__delete-btn_visible' : ''}`
  );

  const cardLikeBtnClassName = (
    `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }



  return(
    <li className="element">
      <button className={cardDeleteBtnClassName} type="button" title="Удалить" onClick={handleDeleteClick}></button>
      <img src={props.link} alt={props.name} className="element__image" onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__name">{props.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeBtnClassName} type="button" title="Мне нравится" onClick={handleLikeClick}></button>
          <p className="element__like-count">{props.likes}</p>
        </div> 
      </div>
    </li>
  )
}

export default Card;