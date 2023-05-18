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
  
  const GuestProps = objToArray(props.guests).map((user) => {
  // const eventGuestProps = guestsArray.map((user) => {

  const name = user.first_name + " " + user.last_name;

    return (
      <Guest
        key={user.id}
        name={name}
        avatar={user.photo}
        selected={user.id === props.value}
        setEventGuest={() => props.onChange(user.id)}
        reset={() => props.onChange("")}
      />
    );
  });

  return (
    <section className={GuestClass}>
      <h4 className="Guest__header text--light">Guests</h4>
      <ul className="Guest__list">{GuestProps}</ul>
    </section>
  );
}

// Validate interviewers as an array
GuestList.propTypes = {
  guests: propTypes.array.isRequired
};