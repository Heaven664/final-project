import React from "react";
import classNames from "classnames";
import "./event-guest-list-item.scss";


export default function EventGuestListItem(props) {

  const EventGuestListClass = classNames("eventGuest__item", { 
    " eventGuest__item--selected": props.selected
   });

  return (
    <li className={EventGuestListClass} onClick={props.setEventGuest}>
      <img
        className="eventGuest__item-image"
        src={props.avatar}
        alt={props.name}
      />
      <span>{props.name}</span>
      {props.selected ? props.name : ""}
    </li>
  );
}