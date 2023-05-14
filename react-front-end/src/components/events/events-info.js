import React, { Component } from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';

// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import "./events-info.scss"
// import MenuList from "components/MenuList.js";

export default function EventsInfo(props) {

  return (
    <main className="info-layout">

      <div className='info-host'>
        <img src="~/react-front-end/public/images/user_ex.png" alt="event_host_avatar" width="500" height="600"/>
      </div>
      <section className='event-title'>
          <span>Amanda's 25 years old birthday party</span>
        </section>
      <section className='event-description'>
          <span>Come and celebrate my 25's birthday!</span>
        </section>
      <div className='info-event'>

      </div>

      <div className='info-meet'>
        <section className='time'>
          <span>May 25, 2023 7:00 pm (PST)</span>
        </section>
        <section className='location'>
          <span>Cactus Club Cafe, English Bay, Vancouver</span>
        </section>
      </div>

    </main>
  )
}

