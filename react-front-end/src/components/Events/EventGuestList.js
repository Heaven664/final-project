import React from "react";
import EventGuestListItem from "./EventGuestListItem";
import classNames from "classnames";
import propTypes from 'prop-types';
import "./EventGuestList.scss";

export default function EventGuestList(props) {

  const eventGuestClass = classNames(
    "eventGuest_item",
    { "eventGuest__item--selected": props.selected }
  );

  const objToArray = (obj) => Object.assign([], Object.values(obj));
  // const guestsArray = props.guests;
  
  const eventGuestProps = objToArray(props.guests).map((user) => {
  // const eventGuestProps = guestsArray.map((user) => {

  const name = user.first_name + " " + user.last_name;  
  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${user.photo}`;
    return (
      <EventGuestListItem
        key={user.id}
        name={name}
        avatar={pathToProfileThumbnail}
        selected={user.id === props.value}
        setEventGuest={() => props.onChange(user.id)}
        reset={() => props.onChange("")}
      />
    );
  });

  return (
    <section className={eventGuestClass}>
      <h4 className="eventGuest__header font24 font-title-color text--light">Guests</h4>
      <ul className="eventGuest__list">{eventGuestProps}</ul>
    </section>
  );
}

// Validate interviewers as an array
EventGuestList.propTypes = {
  guests: propTypes.array.isRequired
};