import React, { useEffect, useState } from "react";
import './NewEvent.scss';
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";


export default function NewEvent(props) {

  // const [fundraiser, setFundaraiser] = useState(null);
  // const [eventGuest, setEventGuest] = useState(null);

  const event_id = props.event;
  const {
    state
  } = useEventsData(event_id, props.user);

  console.log(state);
  console.log(state.event_user);
  console.log(state.eventsInfo);
  console.log(state.fundraisers);
  console.log(props.user, state.eventsInfo.host_id);



  const getFullName = function(obj) {
    return obj.first_name + " " + obj.last_name;
  };

  return (
    <main className="event-layout">
      <form onSubmit={""}>
        <div className='event-left __panel'>

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
              className="event-nameField"
              type="datetime-local"
              placeholder="YYYY-MM-DD hh:mm:ss TT"
              name="event_time"
              defaultValueExpression= "currentDate()"
            />
            </label>
          </section>

          <section className="event-agenda __card box-shadow border-radius20 background-box-color user-detail">

          </section>

          <section className="manage-guest __card box-shadow border-radius20 background-box-color user-detail">

          </section>
        </div>

        <div className='event-right __panel'>
          <section className="maps-api __card box-shadow border-radius20 background-box-color user-detail">

          </section>

          <section className="maps-api __card box-shadow border-radius20 background-box-color user-detail">

          </section>

          <section className="event-wall __card  box-shadow border-radius20 background-box-color user-detail">
            <button onClick={""} className="background-point-color btn-style"> Create </button>
          </section>

        </div>
      </form>
    </main>
  );
}