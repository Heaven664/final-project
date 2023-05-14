import React from "react";
import classNames from "classnames";
import "./src/components/events/event-guest-list-item.scss";


export default function eventGuestListItem(props) {

  const eventGuestListClass = classNames("eventGuest__item", { 
    " eventGuest__item--selected": props.selected
   });

  return (
    <li className={eventGuestListClass} onClick={props.setEventGuest}>
      <img
        className="eventGuest__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
}