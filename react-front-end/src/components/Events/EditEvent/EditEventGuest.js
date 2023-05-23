import React, { useEffect, useState } from "react";
import './EditEvent.scss';
import axios from 'axios';
import useEventsData from "hooks/useEventsData";
import ManageGuest from "./ManageGuests";
import GuestList from "./ManageGuests/GuestList";
import ManageFundraisers from "./ManageFundraisers";
import { Link } from "react-router-dom";
import { useParams } from "react-router";  


export default function EditGuest(props) {

  const [error, setError] = useState({
    name: "",
    time: "",
    agenda: "",
    location: "",
    description: ""
  });
  const [newEvent, setNewEvent] = useState("");
  const [eventGuest, setEventGuest] = useState(null);
  const params = useParams();
  const event_id = params.id;

  const [eventState, setEventState] = useState({
    event_name: "",
    event_time: "",
    event_agenda: "",
    event_location: "",
    event_description: "",
    host_id:""
  });

  useEffect(() => {
    axios.get(`/api/events/${event_id}`)
      .then((res) => {
        console.log(res.data);
        setEventState({
          event_name: res.data?.name,
          event_time: res.data?.event_date,
          event_agenda: res.data?.agenda,
          event_location: res.data?.event_location,
          event_description: res.data?.description,
          host_id:res.data?.host_id
        });
      })
      .catch(err => console.log(err));
  }, []);

  const editEvent = () => {

    const data = {
      name: eventState?.event_name,
      description: eventState?.event_description,
      agenda: eventState?.event_agenda,
      location: eventState?.event_location,
      date: eventState?.event_time
    };
    console.log("edit event: ", data);

    axios.post(`/api/events/${event_id}/edit`, data)
      .then(res => {
        console.log(res.data);
        setNewEvent(res.data?.id);
      })
      .catch(err => console.log(err));
  };



  const finalizeEvent = () => {

    const data = {
      host: props.user,
      eventID: newEvent
    };

    console.log("finalize a new new event: ", data);

    axios.put(`/api/events/new`, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };


  function validate() {

    if (eventState.event_name === "") {
      setError({ name: "Pleae enter a name for your event!" });
      return;
    }
    setError({ name: "" });

    if (eventState.event_time === "") {
      setError({ time: "Pleae choose a time for your event!" });
      return;
    }
    setError({time: ""});

    if (eventState.event_location === "") {
      setError({ location: "Please enter a location for your event!" });
      return;
    }
    setError({location: ""});

    if (eventState.event_description === "") {
      setError({ description: "Pleae describe your event!" });
      return;
    }    
    setError({description: ""});

    if (eventState.event_agenda === "") {
      setError({ agenda: "Pleae enter the agenda for your event!" });
      return;
    }
    setError({agenda: ""});

    editEvent();
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
                value={eventState.event_name}
                onChange={(e) => setEventState({ ...eventState, event_name: e.target.value })}
              />
            </section>
            <section className="event_description __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_description" className="font20">Description:</label>
              <span className="font-warning-color font16">{"  "}{error?.description}</span>
              <textarea
                className="event_descriptionField"
                type="text"
                name="event_description"
                value={eventState.event_description}
                onChange={(e) => setEventState({ ...eventState, event_description: e.target.value })}
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
                value={eventState.event_time}
                onChange={(e) => setEventState({ ...eventState, event_time: e.target.value })}
              />
            </section>

            <section className="event-location __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_location" className="font20">Location:</label>
              <span className="font-warning-color font16">{"  "}{error?.location}</span>
              <input
                className="event-locationField"
                type="text"
                name="event_location"
                value={eventState.event_location}
                onChange={(e) => setEventState({ ...eventState, event_location: e.target.value })}
              />
            </section>

            <section className="event-agenda __card event_align box-shadow border-radius20 background-box-color user-detail">
              <label id="event_agenda" className="font20">
                Agenda:<br />
                <span className="agenda-comment font16">(use Comma to separate things for the best result.)</span>
              <span className="font-warning-color font16">{"  "}{error?.agenda}</span>
              </label>
              <textarea
                className="event-agendaField"
                type="text"
                name="event_agenda"
                value={eventState.event_agenda}
                onChange={(e) => setEventState({ ...eventState, event_agenda: e.target.value })}
              />
            </section>
          </div>
        </div>
      }


      {newEvent ?
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
              <Link to={`/events/${event_id}`}>
                <button onClick={finalizeEvent} className="background-point-color btn-style "> Create</button>
              </Link>
              :
              <Link to={`/events/${event_id}`}>
              <button onClick={validate}
                className="background-point-color btn-style"> Save</button>
              </Link>
          }

        </section>
      </div>

    </form >
  );
}