import React, { Component } from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';

// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import './events.scss';

// import MenuList from "components/MenuList.js";

export default function Events(props) {

  return (
    <main className="event-layout">

      <div className='event-left-panel'>
        <section className="invitation __card">
          <span>You are invited to Amanda's birthday Party</span>
        </section>
        <section className="event-info __card">
        <span>events-info</span>
        </section>
        <section className="event-guest __card">
        <span>events-guest</span>
        </section>
      </div>

      <div className='event-right-panel'>
        <section className="maps-api __card">
        <span>maps-api</span>
        </section>
        <section className="fundraisers __card">
        <span>fundraisers</span>
        </section>
        <section className="event-wall __card">
        <span>events-wall</span>
        </section>
      </div>

    </main>
  )
}