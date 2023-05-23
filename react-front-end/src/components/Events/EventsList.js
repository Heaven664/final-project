import React, { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCompactDisc, faEnvelope, faLayerGroup, faMagnifyingGlass, faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import Events from "./Events";
import './Events.scss';

import EventsListItem from "./EventsListItem";

export default function EventsList(props) {

  const [events, setEvents] = useState([]);

  // change the tab
  const [list, setList] = useState("allEvent");
  function handleListClick(section) {
    setList(section);
  }

  
  useEffect(() => {

    axios.get(`/api/event-user/all/${props.user}`)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);

      })
      .catch(err => console.log(err));
  }, []);




  const eventsProps = events.map((event) => {

    const name = event.host_first_name + " " + event.host_last_name;

    return (
      <Link to={`${event.event_id}`}>
      <EventsListItem
        key={event.event_id}
        id={event.event_id}
        user={props.user}
        event_name={event.event_name}
        host_name={name}
        date={event.event_date}
        photo={event.host_photo}
      /></Link>
    );
  });


  const handleHosting = (e) => {

    e.preventDefault();

    console.log("get events for host: ", props.user);
    handleListClick('hosting');

    axios.get(`/api/event-user/host/${props.user}`)
      .then((res) => {
        console.log(res.data);
        // if (res.data) {
          setEvents(res.data);
      })
      .catch(err => console.log(err));

  };

  const handleAttending = (e) => {

    e.preventDefault();
    handleListClick('attending');

    console.log("get events for guest: ", props.user);

    axios.get(`/api/event-user/attend/${props.user}`)
      .then((res) => {
        console.log(res.data);
        // if (res.data) {
          setEvents(res.data);
      })
      .catch(err => console.log(err));

  };

  const handleHistory = (e) => {

    e.preventDefault();
    handleListClick('history');

    console.log("get events for host: ", props.user);

    axios.get(`/api/event-user/history/${props.user}`)
      .then((res) => {
        console.log(res.data);
        // if (res.data) {
          setEvents(res.data);
      })
      .catch(err => console.log(err));

  };

  const handleUpcoming = (e) => {

    e.preventDefault();
    handleListClick('upcoming');

    console.log("get upcoming events for user: ", props.user);

    axios.get(`/api/event-user/upcoming/${props.user}`)
      .then((res) => {
        console.log(res.data);
        // if (res.data) {
          setEvents(res.data);
      })
      .catch(err => console.log(err));

  };

  const handleAll = (e) => {

    e.preventDefault();
    handleListClick('allEvent');

    console.log("get events for all: ", props.user);

    axios.get(`/api/event-user/all/${props.user}`)
      .then((res) => {
        console.log(res.data);
        // if (res.data) {
        setEvents(res.data);
      })
      .catch(err => console.log(err));

  };

  return (
    <>
      <div className="eventListButtons display-flex">
        <button onClick={handleHosting} className={`flex-one hosting ${list === 'hosting' ? '--selected' : ''}`}>
        <FontAwesomeIcon icon={faMicrophoneLines} /> <br />
          Hosting
        </button>
        <button onClick={handleAttending} className={`background-point-color flex-one attending ${list === 'attending' ? '--selected' : ''}`}>
        <FontAwesomeIcon icon={faEnvelope} /> <br />
          Attending
        </button>
        <button onClick={handleHistory} className={`background-fundraiser-color flex-one history ${list === 'history' ? '--selected' : ''}`}>
        <FontAwesomeIcon icon={faCompactDisc} /> <br />
          History
        </button>
        <button onClick={handleAll} className={`background-add-color flex-one allEvent ${list === 'allEvent' ? '--selected' : ''}`}>
        <FontAwesomeIcon icon={faLayerGroup} /> <br />
          All
        </button>        
        <button onClick={handleUpcoming} className={`background-warning-color flex-one upcoming ${list === 'upcoming' ? '--selected' : ''}`}>
        <FontAwesomeIcon icon={faClock} /> <br />
          Upcoming
        </button>
      </div>
      <ul>{eventsProps}</ul>


    </>
  );
}