import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './MemoriesListItem.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
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
                <div className="friend-user display-flex">
                  <div className="thumbnail background-box-color">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <p className="font20 font-content-color">Anonymous</p>                </div>
                <br />
              </>
              :
              <>
                <Link to={`/profile/${user}`}>
                  <div className="friend-user display-flex">
                    <div className="thumbnail" style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}>
                    </div>
                    <p className="font20 font-content-color">{name}</p>
                  </div>
                </Link><br />
              </>
          }

          <p className="font24 font-content-color">"{message}"</p><br />
           
          <p className="font16 font-content-color"><FontAwesomeIcon icon={faCircleDollarToSlot} /> ${amount}<br /> {donationDate}</p>


        </div>
      </li>
    </>
  );
}      