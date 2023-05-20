import React, { Component } from 'react';
import { useEffect, useState } from "react";
import "./EventsInfo.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faCalendar } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';

export default function EventsInfo(props) {

  const eventDate = dateFormat(props.eventsInfo.event_date, "dddd, mmmm dS, yyyy");

  const eventTime = dateFormat(props.eventsInfo.event_date, "UTC:h:MM:ss TT Z");

  // const eventAgenda = props.eventsInfo.agenda.split(",").join("<br />")

  console.log(props.props);

  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${props.photo}`;
  return (
    <main className="info-layout">

      <section className='event-title font24'>
        <span>{props.eventsInfo.name}</span>
      </section>

      <div className='info-host'>
        <p className='host'>Event Host: <span className='host-name'> {props.hostInfo.first_name} {props.hostInfo.last_name}</span></p>
        <div
          className="-img"
          style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}>
        </div>

      </div>

      {/* <section className='event-description'>
          <span>{props.eventsInfo.description}</span>
        </section> */}

      <div className='info-event'>
        <section className='event-agenda'>
          {props.eventsInfo.description}
        </section>
      </div>

      <div className='info-meet'>
        <section id='date'>
          <FontAwesomeIcon icon={faCalendar} />
          <span>{' '}{eventDate}</span>
        </section>
        <section id='time'>
          <FontAwesomeIcon icon={faClock} />
          <span>{' '}{eventTime}</span>
        </section>
        <section id='location'>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{' '}{props.eventsInfo.event_location}</span>
        </section>
      </div>

    </main>
  )
}

