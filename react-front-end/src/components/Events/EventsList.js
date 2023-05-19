import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import EventsListItem from "./EventsListItem";

export default function EventsList(props) {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    axios.get(`/api/event-user/user/${props.user}`)
      .then((res) => {
        console.log(res.data);
        setEvents({eventsList:res.data});

      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="search-bar border-radius20">
        <form onSubmit={event => event.preventDefault()}>
          <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input
            type="text" name="name" className="border-radius15"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      </div>
      <ListAllUserItem
        filteredUsers={filteredUsers}
        onUnfriend={unfriend}
      />
    </>
  );
}