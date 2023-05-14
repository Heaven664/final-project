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
      <section className="invitation">
        <span>invitation</span>
      </section>
      <section className="events-info">
      <span>events-info</span>
      </section>
      <section className="events-guest">
      <span>events-guest</span>
      </section>
      <section className="maps-api">
      <span>maps-api</span>
      </section>
      <section className="fundraisers">
      <span>fundraisers</span>
      </section>
      <section className="events-wall">
      <span>events-wall</span>
      </section>
    </main>
  )
}