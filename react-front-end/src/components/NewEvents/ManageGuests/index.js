import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './index.scss';

import GuestList from "./GuestList";

export default function ManageGuest(props) {

  const [value, setValue] = useState("a");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const delayTimerRef = useRef(null);

  // friends render
  const [guests, setGuest] = useState({
    event_id: props.eventID,
    user_id: [],
  });

  //Search Users
  useEffect(() => {
    if (value === "") return;
    clearTimeout(delayTimerRef.current);

    delayTimerRef.current = setTimeout(() => {
      axios.get("/api/users")
        .then((res) => {
          const users = res.data;

          // add name key
          const modifiedUsers = users.map((user) => {
            const name = user.first_name + " " + user.last_name;
            return { ...user, name };
            // return setState((prev) => ({ ...prev, name: userName }));
          });

          const filteredResults = modifiedUsers.filter((user) => {
            const fullName = (user.first_name + user.last_name).toLowerCase();
            const searchValue = value.toLowerCase();
            return fullName.includes(searchValue);
          });
          setFilteredUsers(filteredResults);

        });
    }, 400);

    return () => {
      clearTimeout(delayTimerRef.current);
    };
  }, [value]);



  const kickGuest = (guest) => {
    const data = {
      id: guest.id
    };
    console.log("delete data: ", data);

    axios.delete(`/api/event-user/$1`, [data.id])
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const addGuest = (guest) => {
    const data = {
      user: guest.id,
      event: props.eventID
    };
    console.log("add guest: ", data);

    axios.post(`/api/event_user/`, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

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
      <GuestList
        guests={filteredUsers}
        onKick={kickGuest}
        onAdd={addGuest}
      />
    </>
  );
}