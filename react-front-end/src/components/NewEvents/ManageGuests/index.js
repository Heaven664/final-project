import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './index.scss';
import GuestList from "./GuestList";

export default function ManageGuest(props) {

  const [value, setValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [addedGuests, setAddedGuests] = useState([]);
  const [resultGuests, setResultGuests] = useState([]);
  const [guests, setGuests] = useState([]);
  const delayTimerRef = useRef(null);

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


  useEffect(() => {

    axios.get(`/api/event-user/event/${props.event}`)
      .then((res) => {
        console.log(res.data);
        setGuests({event_user:res.data});

      })
      .catch(err => console.log(err));
  }, []);



  const kickGuest = (guest) => {

    // setGuests({ isLoading: true });

    axios.delete(`/api/event-user/${guest}`)
      .then(res => {
        console.log('Deleted Guest:', res.data);

        axios.get(`/api/event-user/event/${props.event}`)
          .then((res) => {
            console.log(res.data);
            // if (res.data) {
            setGuests({event_user:res.data});
            setAddedGuests("");
            setResultGuests("");
          })
          .catch(err => console.log(err));
      });
    };



  const addGuest = (guest) => {


    // setGuests({ isLoading: true });


    const data = {
      user: guest,
      event: props.event
    };
    console.log("add guest: ", data);

    axios.post(`/api/event-user/`, data)
      .then(res => {
        console.log(res.data);

        axios.get(`/api/event-user/event/${props.event}`)
          .then((res) => {
            console.log(res.data);
            // if (res.data) {
            setGuests({event_user:res.data});
            setAddedGuests("");
            setResultGuests("");
          })
          .catch(err => console.log(err));

      })
      .catch(err => console.log(err));
  };















  return (
    <>
      <div className="search-input border-radius20">
        <form onSubmit={event => event.preventDefault()}>
          <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input
            type="text" name="name" className="border-radius15"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>


      </div>
      <div id="searchResult">
      <GuestList
        guests={filteredUsers}
        invited={guests.event_user}  
        value={resultGuests}
        onClick={setResultGuests}
        onAdd={addGuest}
        onKick={kickGuest}
        title={"Search Results"}
      />
      </div>
      <div id="addedToEvent">
        <GuestList
        guests={guests.event_user}
        invited={guests.event_user}  
        value={addedGuests}
        onClick={setAddedGuests}
        onAdd={addGuest}
        onKick={kickGuest}
        title={"Event Guests"}
      />
      </div>
    </>
  );
}

