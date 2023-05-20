import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Countdown from 'react-countdown';

export default function EventsListItem(props) {

  const Completionist = () => {

  const eventDate = new Date(props.date);
  const dateDiff = Math.round((Date.now() - eventDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
      <>
        {dateDiff < 1
          ?
          <span>Event is today!</span>
          :
          <span>Event passed by {dateDiff} days!</span>
        }
      </> 
      );
  };




  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {days}{days > 1 ? " Days " : " Day "}
          {hours}{hours > 1 ? " Hours " : " Hour "}
          {minutes}{minutes > 1 ? " Minutes " : "Minute "}
          {seconds}{seconds > 1 ? " Seconds " : " Second "}
        </span>
      );
    }
  };

  return (
    <>
      <div className="user-list border-radius20 display-flex" key={props.id}>
        <div className="friend-user display-flex">
          <div className="thumbnail" style={{ backgroundImage: `url(${props.photo})` }}></div>
          <p className="font20 font-title-color">{props.event_name}</p>
          {/* <span className="font16 font-contents-color half-margin">{" - "}{props.host_name}</span> */}
        </div>
        <div className="btns display-flex">
          <Countdown
            date={props.date}
            renderer={renderer}
          />
        </div>
      </div>
    </>
  );
}      