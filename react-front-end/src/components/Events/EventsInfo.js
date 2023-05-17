import React, { Component } from 'react';
import { useEffect, useState } from "react";
import "./EventsInfo.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faCalendar } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';

export default function EventsInfo(props) {

  const eventDate = dateFormat(props.eventsInfo.event_date, "dddd, mmmm dS, yyyy");

  const eventTime = dateFormat(props.eventsInfo.event_date, "UTC:h:MM:ss TT Z");

  const eventAgenda = props.eventsInfo.agenda.split(",").join("<br />")

  console.log(props.props);
  return (
    <main className="info-layout">

      <section className='event-title'>
        <span>{props.eventsInfo.name}</span>
      </section>

      <div className='info-host'>
        <img className='-img' src={props.hostInfo.photo} alt="event_host_avatar" width="500" height="600" />
        <span className='host-title'>Event Host:&nbsp;&nbsp;</span>
        <span className='host-name'> {props.hostInfo.first_name} {props.hostInfo.last_name}</span>
      </div>

      {/* <section className='event-description'>
          <span>{props.eventsInfo.description}</span>
        </section> */}

      <div className='info-event'>
        <section className='event-agenda'>
          {eventAgenda}
        </section>
      </div>

      <div className='info-meet'>
        <section className='date'>
          <FontAwesomeIcon icon={faCalendar} />
          <span>{' '}{eventDate}</span>
        </section>
        <section className='time'>
          <FontAwesomeIcon icon={faClock} />
          <span>{' '}{eventTime}</span>
        </section>
        <section className='location'>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{' '}{props.eventsInfo.event_location}</span>
        </section>
      </div>

    </main>
  )
}

