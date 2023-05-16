import React, { Component } from 'react';
import { useEffect, useState } from "react";
import "./events-info.scss";

export default function EventsInfo(props) {

  console.log(props.props);
  return (
    <main className="info-layout">

      <div className='info-host'>
        <img className='-img' src={props.hostInfo.photo} alt="event_host_avatar" width="500" height="600"/>
        <span className='name'>{props.hostInfo.first_name} {props.hostInfo.last_name}</span>
      </div>
      <section className='event-title'>
          <span>{props.eventsInfo.name}</span>
        </section>
      <section className='event-description'>
          <span>{props.eventsInfo.description}</span>
        </section>
      <div className='info-event'>
      <section className='event-agenda'>
          <p>{props.eventsInfo.agenda}</p>
        </section>
      </div>

      <div className='info-meet'>
        <section className='time'>
          <span>{props.eventsInfo.event_date}</span>
        </section>
        <section className='location'>
          <span>{props.eventsInfo.event_location}</span>
        </section>
      </div>

    </main>
  )
}

