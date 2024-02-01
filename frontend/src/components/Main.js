import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);


  return(
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-edit-btn" type="button" title="Обновить аватар" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
        </button>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;