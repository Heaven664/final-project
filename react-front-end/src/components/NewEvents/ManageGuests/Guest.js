import React from "react";
import classNames from "classnames";
import "./EventGuestListItem.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faP } from '@fortawesome/free-solid-svg-icons';


export default function EventGuestListItem(props) {

  const EventGuestListClass = classNames("eventGuest__item", { 
    " eventGuest__item--selected": props.selected
   });

  return (
    <li className={EventGuestListClass} >
      <img
        className="eventGuest__item-image"
        src={props.avatar}
        alt={props.name}
        onClick={props.selected? props.reset: props.setEventGuest}
      />
      <div onClick={"link to profile"}>
      {props.selected
        ?
        props.name
        :
        ""
      }{"  "}<FontAwesomeIcon icon={props.selected? faPlus : ""} />
    </div></li>
  );
}
