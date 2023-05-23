import React, { useEffect, useState } from "react";
import './NewEvent.scss';
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import ManageGuest from "./ManageGuests";
import GuestList from "./ManageGuests/GuestList";
import ManageFundraisers from "./ManageFundraisers";
import { Link } from "react-router-dom";


export default function NewEvent(props) {

  const [error, setError] = useState({
    name: "",
    time: "",
    agenda: "",
    location: "",
    description: ""
  });
  const [newEvent, setNewEvent] = useState("");
  const [eventGuest, setEventGuest] = useState(null);


  const [state, setState] = useState({
    event_name: "Web Immersive West Demo Day",
    event_time: "",
    event_agenda: `
    9:00 AM - Welcome and Introductions,
    9:15 AM - Keynote Speech on the Importance of App Innovation,
    9:30 AM - Presentation of App 1: Features Demo and Q&A,
    10:00 AM - Presentation of App 2: Features Demo and Q&A,
    10:45 AM - Presentation of App 3: Features Demo and Q&A,
    11:15 AM - Presentation of App 4: Features Demo and Q&A,
    2:00 PM - Panel Discussion: App Development Trends and Challenges,
    3:30 PM - Coffee Break and Networking`,
    event_location: "ONLINE",
    event_description: `
    Join us for an exciting App Demo Day, where innovative app developers showcase their creations! This event is a platform for app enthusiasts, entrepreneurs, and investors to witness the latest advancements in the app industry. From productivity tools to gaming experiences, each presentation will provide a unique opportunity to explore cutting-edge features and functionalities. `
  });


  const initializeEvent = () => {

    const data = {
      host: props.user,
      name: state?.event_name,
      description: state?.event_description,
      agenda: state?.event_agenda,
      location: state?.event_location,
      date: state?.event_time
    };
    console.log("initialize a new event: ", data);

    axios.post(`/api/events/`, data)
      .then(res => {
        console.log(res.data);
        setNewEvent(res.data?.id);
        // setNewEvent(3);

        const data = {
          user: props.user,
          event: res.data?.id
        };
        console.log("add host: ", data);

        axios.post(`/api/event-user/`, data)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  // const finalizeEvent = () => {

  //   const data = {
  //     host: props.user,
  //     eventID: newEvent
  //   };

  //   console.log("finalize a new new event: ", data);

  //   axios.put(`/api/events/new`, data)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));
  // };


  function validate() {

    if (state.event_name === "") {
      setError({ name: "Pleae enter a name for your new event!" });
      return;
    }
    setError({ name: "" });

    if (state.event_time === "") {
      setError({ time: "Pleae choose a time for your new event!" });
      return;
    }
    setError({ time: "" });

    if (state.event_location === "") {
      setError({ location: "Please enter a location for your new event!" });
      return;
    }
    setError({ location: "" });

    if (state.event_description === "") {
      setError({ description: "Pleae describe your new event!" });
      return;
    }
    setError({ description: "" });

    if (state.event_agenda === "") {
      setError({ agenda: "Pleae enter the agenda for your new event!" });
      return;
    }
    setError({ agenda: "" });

    initializeEvent();
  };


  return (
    <form className="new-event-layout"
      onSubmit={(event) => { event.preventDefault(); }}>
      {newEvent ?
        "" :
        <div className='-upperpanel'>
          <div className='-leftpanel'>
            <section className="event-name __card event_align box-shadow border-radius20 background-box-color">
              <label id="event_name" className="font20">Name: </label>
              <span className="font-warning-color font16">{"  "}{error?.name}</span>
              <input
                className="event-nameField"
                type="text"
                name="event_name"
                value={state.event_name}
                onChange={(e) => setState({ ...state, event_name: e.target.value })}
              />
            </section>
            <section className="event_description __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_description" className="font20">Description:</label>
              <span className="font-warning-color font16">{"  "}{error?.description}</span>
              <textarea
                className="event_descriptionField"
                type="text"
                name="event_description"
                value={state.event_description}
                onChange={(e) => setState({ ...state, event_description: e.target.value })}
              />
            </section>

          </div>
          <div className=' -rightpanel'>
            <section className="event-time __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_time" className="font20">Date and Time:</label>
              <span className="font-warning-color font16">{"  "}{error?.time}</span>
              <input
                className="event-timeField"
                type="datetime-local"
                name="event_time"
                value={state.event_time}
                onChange={(e) => setState({ ...state, event_time: e.target.value })}
              />
            </section>

            <section className="event-location __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_location" className="font20">Location:</label>
              <span className="font-warning-color font16">{"  "}{error?.location}</span>
              <input
                className="event-locationField"
                type="text"
                name="event_location"
                value={state.event_location}
                onChange={(e) => setState({ ...state, event_location: e.target.value })}
              />
            </section>

            <section className="event-agenda __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_agenda" className="font20">
                Agenda:<br />
                <span className="agenda-comment font16">(use Comma to separate things for the best result.)</span><br />
                <span className="font-warning-color font16">{"  "}{error?.agenda}</span>
              </label>
              <textarea
                className="event-agendaField"
                type="text"
                name="event_agenda"
                value={state.event_agenda}
                onChange={(e) => setState({ ...state, event_agenda: e.target.value })}
              />
            </section>
          </div>
        </div>
      }

      {
        newEvent ?
          <div className="new-event-guest-fundraiser display-flex">
            <section className="manage-guest __card box-shadow border-radius20 background-box-color user-detail">
              <ManageGuest
                value={eventGuest}
                onChange={setEventGuest}
                event={newEvent}
                user={props.user}
              />
            </section>

            <section className="manage-fundraiser __card box-shadow border-radius20 background-box-color user-detail">
              <ManageFundraisers
                event={newEvent}
                user={props.user}
              />
            </section>
          </div>
          :
          ""
      }

      <div className='-lowerpanel'>
        <section className="event-create">
          {
            newEvent
              ?
              <Link to={`/events/${newEvent}`}>
                <button
                  // onClick={finalizeEvent} 
                  className="background-point-color btn-style"> Go to Event Page Now !</button>
              </Link>
              :
              <button onClick={validate}
                className="background-add-color btn-style"> Create!</button>
          }

        </section>
      </div>

    </form >
  );
}