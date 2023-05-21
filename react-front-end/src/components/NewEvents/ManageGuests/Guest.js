import React from "react";
import classNames from "classnames";
import "./Guest.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';


export default function Guest(props) {
  console.log(props);
  const GuestListClass = classNames("Guest__item", {
    " Guest__item--selected": props.selected
  });
  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${props.avatar}`;

  return (
    <li className={GuestListClass} >
      <div
        className="thumbnail"
        style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}
        onClick={props.selected ? props.reset : props.setGuest}>
      </div>

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
            onClick={props.invited ? props.onKick : props.onAdd} />
        </>
        :
        ""
      }
    </li>
  );
}
