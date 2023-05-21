import React, { useEffect, useState } from "react";
import './NewEvent.scss';
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import ManageGuest from "./ManageGuests";
import GuestList from "./ManageGuests/GuestList";
import ManageFundraisers from "./ManageFundraisers";


export default function NewEvent(props) {


  const [newEvent, setNewEvent] = useState("");
  const [eventGuest, setEventGuest] = useState(null);


  const [state, setState] = useState({
    event_name: "",
    event_time: "",
    event_agenda: "",
    event_location: "",
    event_description: ""
  });


  const createEvent = (event) => {

    event.preventDefault();

    const data = {
      host: props.user,
      name: state.event_name,
      description: state.event_description,
      agenda: state.event_agenda,
      location: state.event_location,
      date: state.event_time
    };
    console.log("create new event: ", data);

    axios.post(`/api/events/`, data)
      .then(res => {
        console.log(res.data);
        // setNewEvent(res.data.id);
        setNewEvent(3);
      })
      .catch(err => console.log(err));
  };

  return (
    <form className="new-event-layout" onSubmit={createEvent}>
      {newEvent ?
        "" :
        <div className='-upperpanel'>
          <div className='-leftpanel'>
            <section className="event-name __card event_align box-shadow border-radius20 background-box-color">
              <label id="event_name" className="font20">Name: </label>
              <input
                className="event-nameField"
                type="text"
                name="event_name"
                onChange={(e) => setState({ ...state, event_name: e.target.value })}
              />
            </section>
            <section className="event_description __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_description" className="font20">Description:</label>
              <textarea
                className="event_descriptionField"
                type="text"
                name="event_description"
                onChange={(e) => setState({ ...state, event_description: e.target.value })}
              />
            </section>

          </div>
          <div className=' -rightpanel'>
            <section className="event-time __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_time" className="font20">Date and Time:</label>
              <input
                className="event-timeField"
                type="datetime-local"
                name="event_time"
                onChange={(e) => setState({ ...state, event_time: e.target.value })}
              />
            </section>

            <section className="event-location __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_location" className="font20">Location:</label>
              <input
                className="event-locationField"
                type="text"
                name="event_location"
                onChange={(e) => setState({ ...state, event_location: e.target.value })}
              />
            </section>

            <section className="event-agenda __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_agenda" className="font20">
                Agenda:<br />
                <span id="agenda-comment">(use Comma to separate things for the best result.)</span>
              </label>
              <textarea
                className="event-agendaField"
                type="text"
                name="event_agenda"
                onChange={(e) => setState({ ...state, event_agenda: e.target.value })}
              />
            </section>
          </div>
        </div>
      }



      {

        newEvent
          ?
          <section className="manage-guest __card box-shadow border-radius20 background-box-color user-detail">
            <ManageGuest
              value={eventGuest}
              onChange={setEventGuest}
              event={newEvent}
              user={props.user}
            />
          </section>
          :
          ""
      }

      {
        newEvent
          ?
          <section className="manage-fundraiser __card box-shadow border-radius20 background-box-color user-detail">
            <ManageFundraisers
              event={newEvent}
              user={props.user}
            />
          </section>
          :
          ""
      }

      <div className='-lowerpanel'>
        <section className="event-create">
          {
            newEvent
              ?
              <button onClick={""} className="background-point-color btn-style"> Create !</button>
              :
              <button onClick={createEvent}
                className="background-point-color btn-style"> Next Step !</button>
          }

        </section>
      </div>

    </form>
  );
}