import React from "react";
import classNames from "classnames";
import "./EventGuestListItem.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


export default function EventGuestListItem(props) {

  const EventGuestListClass = classNames("eventGuest__item", {
    " eventGuest__item--selected": props.selected
  });

  return (
    <li className={EventGuestListClass} >
      <div
        className="eventGuest__item-image"
        style={{ backgroundImage: `url(${props.avatar})` }}
        onClick={props.selected ? props.reset : props.setEventGuest}>
      </div>
      <div className="guest-name" onClick={"link to profile"}>
        {props.selected
          ?
          <span>{props.name}</span>
          :
          ""
        }{"  "}<FontAwesomeIcon icon={props.selected ? faEye : ""} />
      </div></li>
  );
}