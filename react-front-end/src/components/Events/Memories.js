import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCompactDisc, faEnvelope, faLayerGroup, faMagnifyingGlass, faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import Events from "./Events";
import './Events.scss';
import { useParams } from "react-router";
import MemoriesListItem from "./MemoriesListItem";
import dateFormat from 'dateformat';

export default function Memories(props) {

  const [donations, setDonations] = useState([]);
  const [event, setEvent] = useState({});

  // change the tab
  const [list, setList] = useState("allEvent");
  function handleListClick(section) {
    setList(section);
  }

  const params = useParams();

  const fundraiser_id = params.id;

  useEffect(() => {

    axios.get(`/api/fundraiser-user/fundraiserinfo/${fundraiser_id}`)
      .then((res) => {
        console.log(res.data);
        setDonations(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {

    axios.get(`/api/events/fundraiser/${fundraiser_id}`)
      .then((res) => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  const MessageProps = donations.map((donation) => {

    const name = donation.first_name + " " + donation.last_name;

    return (
        <MemoriesListItem
          key={donation.id}
          host={props.user}
          user={donation.user_id}
          message={donation.message}
          name={name}
          date={donation.time}
          photo={donation.photo}
          amount={donation.amount}
          anonymous={donation.payment_anonymous}
        />
    );
  });

  const eventDate = dateFormat(event.event_date, "dddd, mmmm dS, yyyy");

  return (
    <>
      <div className="eventListButtons display-flex">

        <button className={`background-primary-color flex-one upcoming ${list === 'upcoming' ? '--selected' : ''}`}>
          Memories for {event.name} on {eventDate}.
        </button>
      </div>
      <ul>{MessageProps}</ul>

      <section className="event-wall __card box-shadow border-radius20 background-box-color user-detail">
        <Link to={`/events/${event.id}`}>
          <button className="background-point-color btn-style">Go Back to Event Page</button>
        </Link>
      </section>
    </>
  );
}