import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHourglass, faHourglassEnd, faHourglassHalf, faHourglassStart, faBoltLightning, faCompactDisc, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import dateFormat from 'dateformat';
import Countdown from 'react-countdown';

export default function MemoriesListItem(props) {

  const {
    host,
    user,
    message,
    name,
    date,
    photo,
    amount,
    anonymous } = props;

  const donationDate = dateFormat(date, "dddd, mmmm dS, yyyy");

  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${photo}`;


  return (
    <>
    <li className="box-shadow border-radius20 list-style-none">                 
      <div className="user-list border-radius20 display-flex" key={props.id}>
        {
          anonymous
            ?
            <>
              <div
                className="thumbnail background-box-color">
                <FontAwesomeIcon icon={faUser} />
                <p className="font20 font-content-color">Anonymous User</p>
              </div>
            </>
            :
            <>
              <Link to={`/profile/${user}`}>
                <div className="friend-user display-flex">
                  <div className="thumbnail" style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}>
                  </div>
                  <p className="font20 font-content-color">{name}</p>
                </div>
              </Link>
            </>
        }

        <p className="font16 font-content-color">Support you with ${amount}<br />on {donationDate}</p>
        <FontAwesomeIcon icon={faCircleDollarToSlot} />
        <br />
        <p className="font20 font-content-color">"{message}"</p>

      </div>
    </li>
    </>
  );
}      