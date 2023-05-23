import React, { useContext, useState } from "react";
import './Events.scss';
import EventsInfo from './EventsInfo';
import EventGuestList from "./EventGuestList";
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import { getEventGuests, getEventInfo } from "../../helpers/event_selectors";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { friendContext } from 'providers/FriendProvider';
import GuestFundraiser from "./GuestFundraiser";
import HostFundraiser from "./HostFundraiser";


export default function Memories(props) {

  return (
    <main className="event-layout">

      <section className="event-wall __card box-shadow border-radius20 background-box-color user-detail">
        <Link to='/groupchat'>
          <button onClick={""} className="background-point-color btn-style">Go Back to Event Page</button>
        </Link>
      </section>


    </main>
  );
}