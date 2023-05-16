import React, { useEffect, useState } from "react";
import './events.scss';
import EventsInfo from './EventsInfo';
import EventGuestList from "./EventGuestList";
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import { getEventGuests, getEventInfo } from "../../helpers/event_selectors";
import Fundraisers from "./Fundraisers";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Events(props) {

const user_id = 1;
const event_id = 3;



  const {
    state
  } = useEventsData(event_id, user_id);

  console.log(state);
  console.log(state.event_user);
  console.log(state.eventsInfo);
  console.log(state.fundraisers);

  return (
    <main className="event-layout">

      <div className='event-left __panel'>
        <section className="invitation __card">
          <span>You are invited to Amanda's birthday Party</span>
        </section>
        <section className="event-info __card">
          <EventsInfo eventsInfo={state.eventsInfo} hostInfo={state.usersInfo}/>

        </section>
        <section className="event-guest __card">
          <EventGuestList guests={state.event_user}/>
        </section>
      </div>

      <div className='event-right __panel'>
        <section className="maps-api __card">
        <span>description / maps</span>
        </section>
        <section className="fundraisers __card">
          <Fundraisers donation={state.fundraisers}/>
        </section>
        <section className="event-wall __card">
      <Button variant="primary">Join Group Chat / Event Wall</Button>{' '}
        </section>
      </div>

    </main>
  )
}