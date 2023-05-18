import React, { useEffect, useState } from "react";
import './NewEvent.scss';
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";


export default function NewEvent(props) {

  // const [fundraiser, setFundaraiser] = useState(null);
  // const [eventGuest, setEventGuest] = useState(null);
  const [state, setState] = useState({
    event_name: "",
    event_time: "", 
    event_agenda: ""
  });

  // const {
  //   state
  // } = useEventsData(event_id, props.user);

  // console.log(state);
  // console.log(state.event_user);
  // console.log(state.eventsInfo);
  // console.log(state.fundraisers);
  // console.log(props.user, state.eventsInfo.host_id);

  return (
      <form className="new-event-layout" onSubmit={""}>
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
              defaultValueExpression= "currentDate()"
              onChange={(e) => setState({ ...state, event_time: e.target.value })}
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
            <span>Manage Guests</span>
          </section>
          
          <section className="manage-fundraiser __card box-shadow border-radius20 background-box-color user-detail">
            <span>Manage Fundraisers</span>
          </section>

          <section className="event-create __card  box-shadow border-radius20 background-box-color user-detail">
            <button onClick={""} className="background-point-color btn-style"> Create </button>
          </section>

        </div>
      </form>
  );
}