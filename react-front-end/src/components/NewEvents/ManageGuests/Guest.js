import React from "react";
import classNames from "classnames";
import "./Guest.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';


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
        onClick={props.selected ? props.reset : props.setGuest}
      />

      {props.selected
        ?
        props.name
        :
        ""
      }
      {props.selected
        ?
        <>
          <FontAwesomeIcon className="-icon"
            icon={props.invited ? faUserXmark : faUserPlus} 
            onClick={props.invited ? props.onKick: props.onAdd}/>
        </>
        :
        ""
      }
    </li>
  );
}
