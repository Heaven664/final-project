import React, { useEffect, useState } from "react";
import './EditEvent.scss';
import ManageGuest from "./ManageGuests";
import { Link } from "react-router-dom";
import { useParams } from "react-router";


export default function EditGuest(props) {

  const [eventGuest, setEventGuest] = useState(null);
  const params = useParams();
  const event_id = params.id;

  return (
    <form className="new-event-layout"
      onSubmit={(event) => { event.preventDefault(); }}>

      <div className="new-event-guest-fundraiser display-flex">
        <section className="manage-guest __card box-shadow border-radius20 background-box-color user-detail">
          <ManageGuest
            value={eventGuest}
            onChange={setEventGuest}
            event={event_id}
            user={props.user}
          />
        </section>
      </div>

      <div className='-lowerpanel'>
        <section className="event-create">

          <Link to={`/events/${event_id}`}>
            <button
              className="background-point-color btn-style"> Go back to the Event</button>
          </Link>

        </section>
      </div>

    </form >
  );
}