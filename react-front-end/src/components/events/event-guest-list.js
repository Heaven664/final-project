import React from "react";
import EventGuestListItem from "./event-guest-list-item";
import classNames from "classnames";
import propTypes from 'prop-types';
import "./event-guest-list.scss";

export default function EventGuestList(props) {

  const eventGuestClass = classNames(
    "eventGuest_item",
    { "eventGuest__item--selected": props.selected }
  );

  const objToArray = (obj) => Object.assign([], Object.values(obj));
  // const guestsArray = props.guests;
  
  const eventGuestProps = objToArray(props.guests).map((user) => {
  // const eventGuestProps = guestsArray.map((user) => {

    return (
      <EventGuestListItem
        key={user.id}
        name={user.first_name + " " + user.last_name}
        avatar={user.photo}
        // selected={user.id === props.value}
      // setInterviewer={() => props.onChange(user.id)}
      />
    );
  });

  return (
    <section className={eventGuestClass}>
      <h4 className="eventGuest__header text--light">Guests</h4>
      <ul className="eventGuest__list">{eventGuestProps}</ul>
    </section>
  );
}

// Validate interviewers as an array
EventGuestList.propTypes = {
  guests: propTypes.array.isRequired
};