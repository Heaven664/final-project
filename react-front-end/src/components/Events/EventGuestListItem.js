import React, { useContext } from "react";
import classNames from "classnames";
import "./EventGuestListItem.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { friendContext } from "providers/FriendProvider";


export default function EventGuestListItem(props) {

  const { openProfile } = useContext(friendContext);

  const EventGuestListClass = classNames("eventGuest__item", {
    " eventGuest__item--selected": props.selected
  });

  console.log("prop key", props.user);
  return (
    <li className={EventGuestListClass} >
      <div
        className="eventGuest__item-image"
        style={{ backgroundImage: `url(${props.avatar})` }}
        onClick={props.selected ? props.reset : props.setEventGuest}>
      </div>
      <Link to='/profile'>
        <div className="guest-name" onClick={() => openProfile(props.user)}>
          {props.selected
            ?
            <><span>{props.name}</span>
              {"  "}
              <FontAwesomeIcon
                icon={props.selected ? faEye : ""} />

            </>
            :
            ""
          }
        </div>
      </Link></li>

  );
}