import React, { useEffect, useState } from "react";
import './events.scss';
import EventsInfo from './events-info';
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import { getEventGuests } from "../../helpers/event_selectors";


export default function Events(props) {

const user_id = 1;
const event_id = 1;

  const {
    state
  } = useEventsData();

  console.log(state);

  return (
    <main className="event-layout">

      <div className='event-left __panel'>
        <section className="invitation __card">
          <span>You are invited to Amanda's birthday Party</span>
        </section>
        <section className="event-info __card">
          <EventsInfo />

        </section>
        <section className="event-guest __card">
        <span>events-guest</span>
        </section>
      </div>

      <div className='event-right __panel'>
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