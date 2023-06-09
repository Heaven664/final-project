import React, { useState, useEffect } from "react";
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faHourglassEnd, faHourglassHalf, faHourglassStart, faBoltLightning, faCompactDisc, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";

import Countdown from 'react-countdown';
import './Events.scss';

export default function EventsListItem(props) {

  const [fundraiserStatus, setFundraiserStatus] = useState(null);

  useEffect(() => {

    axios.get(`/api/fundraisers/${props.id}`)
      .then((res) => {
        console.log(res.data);
        setFundraiserStatus(res.data);

      })
      .catch(err => console.log(err));
  }, []);

  const eventDate = new Date(props.date);
  const dateDiff = (eventDate.getTime() - Date.now());
  const dateDiffDays = (dateDiff * -1) / (1000 * 60 * 60 * 24);
  const dateDiffRound = Math.round(dateDiffDays);
  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${props.photo}`;

  const Completionist = () => {

    return (
      <>
        {dateDiffDays < 1 && dateDiffDays > 0
          ?
          <span>
            <FontAwesomeIcon icon={faBoltLightning} className="half-margin-right" />
            Today
          </span>
          :
          <span>
            <FontAwesomeIcon icon={faCompactDisc} className="half-margin-right" />
            {dateDiffRound}{dateDiffRound > 1 ? " days ago " : " day ago "}
          </span>
        }
      </>
    );
  };


  <></>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (

        <>
          {
            dateDiff > (60 * 1000)
              ?
              <>
                {
                  dateDiff > (60 * 60 * 1000)
                    ?
                    <>
                      {
                        dateDiff > (60 * 60 * 1000 * 24)
                          ?
                          <span className="countDownDays">
                            <FontAwesomeIcon icon={faHourglassStart} className="half-margin-right" />
                            {days}{days > 1 ? " days " : " day "}</span>
                          :
                          <span className="countDownHours">
                            <FontAwesomeIcon icon={faHourglassHalf} className="half-margin-right" />
                            {hours}{hours > 1 ? " hours " : " hour "}</span>
                      }
                    </>
                    :
                    <span className="countDownMinutes">
                      <FontAwesomeIcon icon={faHourglassEnd} className="half-margin-right" />
                      {minutes}{minutes > 1 ? " minutes " : "minute "}</span>
                }
              </>
              :
              <span className="countDownSeconds">
                <FontAwesomeIcon icon={faHourglass} className="half-margin-right" />
                {seconds}{seconds > 1 ? " seconds " : " second "}</span>
          }
        </>
      );
    }
  };

  return (
    <>
      {/* <Routes>
        <Route path=":id" element={
        <Events user={props.user} />} />
      </Routes> */}
      <li className="box-shadow border-radius20 list-style-none">
        <div className="user-list border-radius20 display-flex" key={props.id} onClick={props.onClick}>

          <div className="friend-user display-flex">
            <div className="thumbnail" style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}></div>
            <p className="font20 font-content-color event-list-name">{props.event_name}</p>
            {/* <span className="font16 font-contents-color half-margin">{" - "}{props.host_name}</span> */}

            {
              fundraiserStatus
              ?
              <>
              <FontAwesomeIcon icon={faCircleDollarToSlot} />
              </>
              :
              <></>
            }
            
          </div>

            
          <div className="btns display-flex flex-row">
            <Countdown
              date={props.date}
              renderer={renderer}
            />
          </div>
          
        </div>
      </li>
    </>
  );
}      