import React from "react";
import Guest from "./Guest";
import classNames from "classnames";
import propTypes from 'prop-types';
import "./GuestList.scss";

export default function GuestList(props) {

  const GuestClass = classNames(
    "Guest_item",
    { "Guest__item--selected": props.selected }
  );



  const objToArray = (obj) => Object.assign([], Object.values(obj));
  // const guestsArray = props.guests;

  let propsInvited = props.invited;

  if (!props.invited) {
    propsInvited = {};
  };

  const invited = objToArray(propsInvited).map(user => user.user_id);

  let propsGuests = props.guests;

  if (!props.guests) {
    propsGuests = {};
  };

  const GuestProps = objToArray(propsGuests).map((user) => {

    const host = (props.user === user.id ? true : false);

    const name = user.first_name + " " + user.last_name;
    const pathToProfileThumbnail = `http://localhost:8080/thumbs/${user.photo}`;

    return (
      <Guest
        key={user.id}
        name={name}
        avatar={pathToProfileThumbnail}
        selected={user.id === props.value}
        invited={invited.includes(user.id)}
        onAdd={(e) => { e.preventDefault(); props.onAdd(user.id); }}
        onKick={(e) => { e.preventDefault(); props.onKick(user.event_user_id); }}
        setGuest={() => props.onClick(user.id)}
        reset={() => props.onClick("")}
        host={host}
      />
    );
  });

  return (
    <section className={GuestClass}>
      <p className="Guest__header font20">{props.title}</p>
      <ul className="Guest__list">{GuestProps}</ul>
    </section>
  );
}

// Validate interviewers as an array
GuestList.propTypes = {
  guests: propTypes.array.isRequired
};