import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCompactDisc, faEnvelope, faLayerGroup, faMagnifyingGlass, faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";

import EventsListItem from "./EventsListItem";

export default function EventsList(props) {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    axios.get(`/api/event-user/user/${props.user}`)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);

      })
      .catch(err => console.log(err));
  }, []);


  const eventsProps = events.map((event) => {

    const name = event.first_name + " " + event.last_name;
    return (
      <EventsListItem
        key={event.event_id}
        event_name={event.name}
        host_name={name}
        date={event.event_date}
        photo={event.photo}
        setDay={props.onChange}
      />
    );
  });







  return (
    <>
      <div className="eventListButtons display-flex">
        <button onClick={""} className="background-primary-color btn-style flex-one">
        <FontAwesomeIcon icon={faMicrophoneLines} /> <br />
          Hosting
        </button>
        <button onClick={""} className="background-point-color btn-style flex-one">
        <FontAwesomeIcon icon={faEnvelope} /> <br />
          Attending
        </button>
        <button onClick={""} className="background-fundraiser-color btn-style flex-one">
        <FontAwesomeIcon icon={faCompactDisc} /> <br />
          History
        </button>
        <button onClick={""} className="background-add-color btn-style flex-one">
        <FontAwesomeIcon icon={faLayerGroup} /> <br />
          All
        </button>        
        <button onClick={""} className="background-warning-color btn-style flex-one">
        <FontAwesomeIcon icon={faClock} /> <br />
          Upcoming
        </button>
      </div>
      <ul>{eventsProps}</ul>
    </>
  );
}