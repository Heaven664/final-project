import React from "react";
import eventGuestListItem from "./event-guest-list-item";
import classNames from "classnames";
import propTypes from 'prop-types';

export default function eventGuestList(props) {

  const eventGuestClass = classNames(
    "eventGuest_item",
    { "eventGuest__item--selected": props.selected }
  );

  const objToArray = (obj) => Object.assign([], Object.values(obj));

  const eventGuestProps = objToArray(props.users).map((user) => {

    return (
      <eventGuestListItem
        key={user.id}
        name={user.name}
        avatar={user.avatar}
        selected={user.id === props.value}
        setInterviewer={() => props.onChange(user.id)}
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

//Validate interviewers as an array
// eventGuestList.propTypes = {
//   eventGuest: propTypes.array.isRequired
// };