import React, { useEffect, useState } from "react";
import './Events.scss';
import EventsInfo from './EventsInfo';
import EventGuestList from "./EventGuestList";
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import { getEventGuests, getEventInfo } from "../../helpers/event_selectors";
import Fundraisers from "./Fundraisers";
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function Events(props) {

const event_id = 2;
const {
  state
} = useEventsData(event_id, props.user);

console.log(state);
console.log(state.event_user);
console.log(state.eventsInfo);
console.log(state.fundraisers);
console.log(props.user, state.eventsInfo.host_id);


const [eventGuest, setEventGuest] = useState(null);



const getFullName = function (obj) {
  return obj.first_name + " " + obj.last_name;
}

  return (
    <main className="event-layout">

      <div className='event-left __panel'>
        <section className="invitation __card box-shadow border-radius20 background-box-color user-detail">
          <span>
            {props.user===state.eventsInfo.host_id ? 
            `Welcome back to your ${state.eventsInfo.name}!` :
            `You are invited to ${getFullName(state.usersInfo)}'s ${state.eventsInfo.name}!` }
            </span>
        </section>
        <section className="event-info __card box-shadow border-radius20 background-box-color user-detail">
          <EventsInfo eventsInfo={state.eventsInfo} hostInfo={state.usersInfo}/>

        </section>
        <section className="event-guest __card box-shadow border-radius20 background-box-color user-detail">
          <EventGuestList 
            guests={state.event_user} 
            value={eventGuest}
            onChange={setEventGuest}
          />
        </section>
      </div>

      <div className='event-right __panel'>
        <section className="maps-api __card box-shadow border-radius20 background-box-color user-detail">
        <span>description / maps</span>
        </section>
        <section className="fundraisers __card  box-shadow border-radius20 background-box-color user-detail">
          <Fundraisers donation={state.fundraisers}/>
        </section>
        <section className="event-wall __card  box-shadow border-radius20 background-box-color user-detail">
            <button onClick={""} className="background-point-color btn-style">Join Group Chat</button>
        </section>
      </div>

    </main>
  )
}