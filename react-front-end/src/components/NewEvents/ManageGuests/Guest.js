import React from "react";
import classNames from "classnames";
import "./Guest.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function Guest(props) {

  const GuestListClass = classNames("Guest__item", { 
    " Guest__item--selected": props.selected
   });

  return (
    <li className={GuestListClass} >
      <img
        className="Guest__item-image"
        src={props.avatar}
        alt={props.name}
        onClick={props.selected? props.reset: props.setGuest}
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
