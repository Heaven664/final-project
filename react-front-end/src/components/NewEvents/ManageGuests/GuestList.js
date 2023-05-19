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

  if (!props.invited){
    propsInvited = {};
  };

  const invited = objToArray(propsInvited).map(user=> user.user_id);

  let propsGusts = props.guests;

  if (!props.guests){
    propsGusts = {};
  };

  const GuestProps = objToArray(propsGusts).map((user) => {


  const name = user.first_name + " " + user.last_name;

    return (
      <Guest
        key={user.id}
        name={name}
        avatar={user.photo}
        selected={user.id === props.value}
        invited={invited.includes(user.id)}
        onAdd={() => props.onAdd(user.id)}
        onKick={() => props.onKick(user.event_user_id)}
        setGuest={() => props.onClick(user.id)}
        reset={() => props.onClick("")}
      />
    );
  });

  return (
    <section className={GuestClass}>
      <span className="Guest__header">{props.title}</span>
      <ul className="Guest__list">{GuestProps}</ul>
    </section>
  );
}

// Validate interviewers as an array
GuestList.propTypes = {
  guests: propTypes.array.isRequired
};