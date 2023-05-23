import React, { useContext, useState, useEffect } from "react";
import './Events.scss';
import EventsInfo from './EventsInfo';
import EventGuestList from "./EventGuestList";
import axios from 'axios';
import useEventsData from "../../hooks/useEventsData";
import { getEventGuests, getEventInfo } from "../../helpers/event_selectors";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { friendContext } from 'providers/FriendProvider';
import GuestFundraiser from "./GuestFundraiser";
import HostFundraiser from "./HostFundraiser";
import ManageFundraisers from "components/NewEvents/ManageFundraisers";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Events(props) {

  const [eventGuest, setEventGuest] = useState(null);
  const [status, setStatus] = useState('SHOW');
  const [anotherFundraiser, setAnotherFundraiser] = useState(null);

  const params = useParams();
  const { textGroupWithId } = useContext(friendContext);

  const event_id = params.id;

  const {
    state, fundraiser, setFundraiser
  } = useEventsData(event_id, props.user);


  useEffect(() => {

    console.log('get fundraiser for event', event_id);

    axios.get(`/api/fundraisers/${event_id}`)
      .then((res) => {
        console.log(res.data);
        setAnotherFundraiser(res.data);
        // if (Object.keys(res.data).length != 0) {
        //   setFundraiser({...res.data, empty: "no" });
        // }
      })
      .catch(err => console.log(err));

  }, []);



  // console.log(state);
  // console.log(state.event_user);
  // console.log(state.events_host_Info);
  // console.log(state.fundraisers);
  // console.log(props.user, state.events_host_Info.host_id);

  const getFullName = function(obj) {
    return obj.first_name + " " + obj.last_name;
  };

  const agendaList = (
    state.events_host_Info.agenda
      ?
      state.events_host_Info.agenda.split(',').map((agendaItem) => {
        return (<li>{agendaItem}</li>);
      })
      :
      "");

  const onMessage = (id) => {
    textGroupWithId(id);
  };

  const handleMessageClick = () => {
    onMessage(event_id);
  };


  const objToArray = (obj) => Object.assign([], Object.values(obj));

  const getEventUserID = objToArray(state.event_user).find(e =>
    e.user_id === props.user);

  const handleQuitEvent = () => {

    console.log(`Remove ${props.user} from event ${event_id}`);

    return axios.delete(`/api/event-user/${getEventUserID?.event_user_id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };


  const handleCancelEvent = () => {

    console.log(`Remove event ${event_id}`);

    return axios.post(`/api/events/${event_id}/delete/`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };


  return (
    <main className="event-layout">

      <div className='event-left __panel'>

        {
          props.user === state.events_host_Info.host_id
            ?
            <>
              {
                status === 'SHOW' || status === 'CHOOSE'
                  ?
                  <>
                    {
                      status === 'SHOW'
                        ?
                        <section className="modification __card  user-detail">

                          <button onClick={() => setStatus('CHOOSE')} className="modi background-add-color btn-style">Edit Event</button>

                          <button onClick={() => setStatus('CONFIRM')} className="modi background-bad-color btn-style">Cancel Event</button>
                        </section>
                        :
                        <section className="modification __card  user-detail">
                          <Link to={`/myevents/${event_id}`}  className="modi-link">
                            <button
                              onClick={() => { setStatus('SHOW'); }} className="background-warning-color btn-style">Save Changes</button>
                          </Link>
                          <Link to={`/editevent/${event_id}`}  className="modi-link">
                            <div>
                              <button className="background-primary-color btn-style">Edit Info</button>
                            </div>
                          </Link>
                        </section>
                    }
                  </>
                  :
                  <section className="modification __card  user-detail">

                    <Link to={`/myevents/`} className="modi-link">
                      <button onClick={handleCancelEvent} className=" background-warning-color btn-style">Confirm</button>
                    </Link>
                    <button onClick={() => setStatus('SHOW')} className="modi background-primary-color btn-style">Cancel</button>

                  </section>
              }

            </>
            :
            <section className="invitation __card box-shadow border-radius15 background-point-color user-detail">
              <span>{`You are invited to ${getFullName(state.usersInfo)}'s ${state.events_host_Info.event_name}!`}
              </span>
            </section>
        }

        <section className="event-info __card box-shadow border-radius20 background-box-color user-detail">
          <EventsInfo 
          events_host_Info={state.events_host_Info} 
          hostInfo={state.usersInfo}
          id={event_id} />

        </section>

        <section className="event-guest __card box-shadow border-radius20 background-box-color user-detail">
          <EventGuestList
            guests={state.event_user}
            value={eventGuest}
            onChange={setEventGuest}
          />

          {
            props.user === state.events_host_Info.host_id
              ?
              ""
              :
              <Link to='/events'>
                <button onClick={handleQuitEvent} className="quit background-warning-color btn-style">Quit Event</button>
              </Link>
          }
        </section>
      </div>

      <div className='event-right __panel'>
        <section className="maps-api __card box-shadow border-radius20 background-box-color user-detail">
          <span>{state.events_host_Info.agenda ? agendaList : ""}</span>
        </section>

        {
          state.fundraisers
            ?
            <>
              {
                props.user === state.events_host_Info.host_id
                  ?
                  <section className="fundraisers __card box-shadow border-radius20 background-box-color user-detail">
                    <HostFundraiser
                      fundraiser={fundraiser}
                      user={props.user}
                      setFundraiser={setFundraiser}
                      event={state?.events_host_Info}
                    />

                  </section>
                  :
                  <section className="fundraisers __card box-shadow border-radius20 background-box-color user-detail">
                    <GuestFundraiser
                      fundraiser={fundraiser}
                      user={props.user}
                      setFundraiser={setFundraiser}
                    />
                  </section>
              }
            </>
            :
            <>
              {
                props.user === state.events_host_Info.host_id && status === 'CHOOSE'
                  ?
                  <section className="fundraisers __card box-shadow border-radius20 background-box-color user-detail">
                    <ManageFundraisers
                      user={props.user}
                      event={event_id}
                    />
                  </section>
                  :
                  <section></section>
              }
            </>
        }


        {
          props.user === state.events_host_Info.host_id
            ?
            <>
              {
                status === 'CHOOSE'
                  ?
                  <section className="event-wall __card box-shadow border-radius20 background-box-color user-detail">
                    <Link to={`/manageguests/${event_id}`}>
                      <button className="background-point-color btn-style">
                    <FontAwesomeIcon icon={faUsers} /> <br />
                    Manage Guests</button>
                    </Link>
                  </section>
                  :
                  <section className="event-wall __card box-shadow border-radius20 background-box-color user-detail">
                    <Link to='/groupchat'>
                      <button onClick={handleMessageClick} className="background-point-color btn-style">Join Group Chat</button>
                    </Link>
                  </section>
              }
            </>
            :
            <section className="event-wall __card box-shadow border-radius20 background-box-color user-detail">
              <Link to='/groupchat'>
                <button onClick={handleMessageClick} className="background-point-color btn-style">Join Group Chat</button>
              </Link>
            </section>


        }

      </div>

    </main>
  );
}