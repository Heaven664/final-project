import React, { useEffect, useState } from "react";
import './NewEvent.scss';
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import ManageGuest from "./ManageGuests";


export default function NewEvent(props) {

  const [fundraiser, setFundaraiser] = useState(null);
  const [newEvent, setNewEvent] = useState(null);
  // const [eventGuest, setEventGuest] = useState(null);
  const [state, setState] = useState({
    event_name: "",
    event_time: "",
    event_agenda: "",
    event_location: "",
    event_description: ""
  });


  const createEvent = (event) => {
    
    event.preventDefault()

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
        setNewEvent(res.data.id);
      })
      .catch(err => console.log(err))
  };

  return (
    <form className="new-event-layout" onSubmit={createEvent}>
      <div className='-left __panel'>

        <section className="event-name __card box-shadow border-radius20 background-box-color user-detail">
          <label>
            Name:
            <input
              className="event-nameField"
              type="text"
              name="event_name"
              onChange={(e) => setState({ ...state, event_name: e.target.value })}
            />
          </label>
        </section>


        <section className="event-time __card box-shadow border-radius20 background-box-color user-detail">
          <label>
            Date and Time:
            <input
              className="event-timeField"
              type="datetime-local"
              name="event_time"
              defaultValueExpression="currentDate()"
              onChange={(e) => setState({ ...state, event_time: e.target.value })}
            />
          </label>
        </section>

        <section className="event-location __card box-shadow border-radius20 background-box-color user-detail">
          <label>
            Location:
            <input
              className="event-locationField"
              type="text"
              name="event-location"
              onChange={(e) => setState({ ...state, event_location: e.target.value })}
            />
          </label>
        </section>

        <section className="event-agenda __card box-shadow border-radius20 background-box-color user-detail">
          <label>
            Agenda:
            <input
              className="event-agendaField"
              type="text"
              name="event_agenda"
              onChange={(e) => setState({ ...state, event_agenda: e.target.value })}
            />
          </label>
        </section>

        <section className="event_description __card box-shadow border-radius20 background-box-color user-detail">
          <label>
            Description:
            <input
              className="event_descriptionField"
              type="text"
              name="event_description"
              onChange={(e) => setState({ ...state, event_description: e.target.value })}
            />
          </label>
        </section>


      </div>

      <div className=' -right __panel'>

        <section className="manage-guest __card box-shadow border-radius20 background-box-color user-detail">

          {
            newEvent
              ?
              <ManageGuest event={newEvent.event_id} />
              :
              <span>Move on to next step to add guests!</span>
          }
        </section>

        <section className="manage-fundraiser __card box-shadow border-radius20 background-box-color user-detail">

          {
            newEvent
              ?
              <ManageGuest event={newEvent.event_id} />
              :
              <span>Move on to next step to add a fundraiser!</span>
          }
        </section>

        <section className="event-create __card  box-shadow border-radius20 background-box-color user-detail">
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