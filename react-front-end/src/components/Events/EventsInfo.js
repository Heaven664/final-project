import React, { Component } from 'react';
import { useEffect, useState } from "react";
import "./EventsInfo.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faCalendar } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';

export default function EventsInfo(props) {

  const eventDate = dateFormat(props.events_host_Info.event_date, "dddd, mmmm dS, yyyy");

  const eventTime = dateFormat(props.events_host_Info.event_date, "UTC:h:MM:ss TT Z");

  // const eventAgenda = props.events_host_Info.agenda.split(",").join("<br />")

  // console.log(props.props);

  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${props.events_host_Info.host_photo}`;

  const pathToQrCode = `https://chart.googleapis.com/chart?cht=qr&chs=100x100&chl=http://localhost:3000/events/${props.id}&choe=UTF-8`;

  return (
    <main className="info-layout">

      <section className='event-title font24'>
        <span>{props.events_host_Info.event_name}</span>
      </section>

      <div className='info-host'>
        <p className='host'>Event Host: <span className='host-name'> {props.events_host_Info.host_first_name} {props.events_host_Info.host_last_name}</span></p>
        <div
          className="-img"
          style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}>
        </div>
      </div>

      {/* <section className='event-description'>
          <span>{props.events_host_Info.description}</span>
        </section> */}

      <div className='info-event'>
        <section className='event-agenda'>
          {props.events_host_Info.description}
        </section>
      </div>



      <div className='info-meet'>
        <div
          id="qrcode"
          style={{ backgroundImage: `url(${pathToQrCode})` }}>
        </div>

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
          <span>{' '}{props.events_host_Info.event_location}</span>
        </section>
      </div>

    </main>
  );
}

