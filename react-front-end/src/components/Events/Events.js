import React, { useContext, useState } from "react";
import './Events.scss';
import EventsInfo from './EventsInfo';
import EventGuestList from "./EventGuestList";
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import { getEventGuests, getEventInfo } from "../../helpers/event_selectors";
import Fundraisers from "./Fundraisers";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { friendContext } from 'providers/FriendProvider';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function Events(props) {

  // const [fundraiser, setFundaraiser] = useState(null);
  const [eventGuest, setEventGuest] = useState(null);
  const params = useParams();
  const { textGroupWithId } = useContext(friendContext);

  const event_id = params.id;

  const {
    state
  } = useEventsData(event_id, props.user);

  console.log(state);
  console.log(state.event_user);
  console.log(state.events_host_Info);
  console.log(state.fundraisers);
  console.log(props.user, state.events_host_Info.host_id);

  const getFullName = function(obj) {
    return obj.first_name + " " + obj.last_name;
  };

  const agendaList = (
    state.events_host_Info.agenda
      ?
      state.events_host_Info.agenda.split(',').map((agendaItem) => {
        return (<li>{agendaItem}</li>);
      })
      :
      "");

  const onMessage = (id) => {
    textGroupWithId(id);
  };

  const handleMessageClick = () => {
    onMessage(event_id);
  };

  return (
    <main className="event-layout">

      <div className='event-left __panel'>

        {
          props.user === state.events_host_Info.host_id
            ?
            <section className="modification __card  user-detail">
              <button onClick={""} className="modi background-add-color btn-style">Edit Event</button>
              <button onClick={""} className="modi background-bad-color btn-style">Cancel Event</button>
            </section>
            :
            <section className="invitation __card box-shadow border-radius15 background-point-color user-detail">
              <span>{`You are invited to ${getFullName(state.usersInfo)}'s ${state.events_host_Info.event_name}!`}
              </span>
            </section>
        }

        <section className="event-info __card box-shadow border-radius20 background-box-color user-detail">
          <EventsInfo events_host_Info={state.events_host_Info} hostInfo={state.usersInfo} />

        </section>

        <section className="event-guest __card box-shadow border-radius20 background-box-color user-detail">
          <EventGuestList
            guests={state.event_user}
            value={eventGuest}
            onChange={setEventGuest}
          />

          {
            props.user === state.events_host_Info.host_id
              ?
              ""
              :
              <button onClick={""} className="quit background-warning-color btn-style">Quit Event</button>
          }
        </section>
      </div>

      <div className='event-right __panel'>
        <section className="maps-api __card box-shadow border-radius20 background-box-color user-detail">
          <span>{state.events_host_Info.agenda ? agendaList : ""}</span>
        </section>

        {
          state.fundraisers
            ?
            <section className="fundraisers __card box-shadow border-radius20 background-box-color user-detail"><Fundraisers donation={state.fundraisers} /></section>
            :
            // <section className="no-fundraisers __card  box-shadow border-radius20 background-box-color user-detail"></section>
            <section></section>
        }

        <section className="event-wall __card box-shadow border-radius20 background-box-color user-detail">
          <Link to='/groupchat'>
            <button onClick={handleMessageClick} className="background-point-color btn-style">Join Group Chat</button>
          </Link>
        </section>
      </div>

    </main>
  );
}