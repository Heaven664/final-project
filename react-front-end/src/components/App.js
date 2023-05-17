import React, { useState, useEffect } from "react";
import axios from 'axios';


// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

import MyProfile from './MyProfile';
import Friend from './Friend';
import PrivateChat from 'components/PrivateChat';
import GroupChat from 'components/GroupChat';
import Setting from 'components/Setting';
import Login from 'components/Login'
import Events from "./Events/Events";
import NewEvent from "./NewEvents/NewEvent";

export default function App(props) {

  const [user, setUser] = useState(null);
  const [event, setEvent] = useState(null);

  // Login user on the server
  const login1 = function () {
    axios.post("api/login")
      .then(res => {
        setUser(res.data);
        setEvent(Math.floor(Math.random() * 10)); 
      })
      .catch(err => {
        console.log("Login:", err.message);
      });
  };

   // Login user on the server
   const login2 = function () {
    axios.post("api/login/1")
      .then(res => {
        setUser(res.data);
        setEvent(Math.floor(Math.random() * 10)); 
      })
      .catch(err => {
        console.log("Login:", err.message);
      });
  };

  const [selectedPage, setSelectedPage] = useState("profile");

  function handlePageClick(page) {
    setSelectedPage(page);
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <nav className="sidebar__menu">
          <ul>
            <li className={`profile 
              ${selectedPage === 'profile' ? '--selected' : ''}`}
              onClick={() => handlePageClick('profile')}>
              <FontAwesomeIcon icon={faUser} /><br />
              <span>My Profile</span>
            </li>
            <li className={`friends 
              ${selectedPage === 'friends' ? '--selected' : ''}`}
              onClick={() => handlePageClick('friends')}>
              <FontAwesomeIcon icon={faUsers} /><br />
              <span>Friends</span>
            </li>
            <li className={`chat 
              ${selectedPage === 'chat' ? '--selected' : ''}`}
              onClick={() => handlePageClick('chat')}>
              <FontAwesomeIcon icon={faComment} /><br />
              <span>Chat</span>
            </li>
            <li className={`groupChat 
              ${selectedPage === 'groupChat' ? '--selected' : ''}`}
              onClick={() => handlePageClick('groupChat')}>
              <FontAwesomeIcon icon={faComments} /><br />
              <span>Group Chat</span>
            </li>
            <li className={`events 
              ${selectedPage === 'events' ? '--selected' : ''}`}
              onClick={() => handlePageClick('events')}>
              <FontAwesomeIcon icon={faCakeCandles} /><br />
              <span>Events</span>
            </li>
            <li className={`myEvent 
              ${selectedPage === 'newEvent' ? '--selected' : ''}`}
              onClick={() => handlePageClick('newEvent')}>
              <FontAwesomeIcon icon={faCalendarPlus} /><br />
              <span>New Event</span>
            </li>
            <li className={`setting 
              ${selectedPage === 'setting' ? '--selected' : ''}`}
              onClick={() => handlePageClick('setting')}>
              <FontAwesomeIcon icon={faGear} /><br />
              <span>Setting</span>
            </li>
          </ul>
        </nav>
        <div className="topNav">
          <div>
            <img
              className="mainLogo"
              src="images/logo.png"
              alt="Wish Whisper"
            />
          </div>
          <div onClick={() => handlePageClick('setting')}>
            <img
              className="user-profile-pic"
              src="images/user_ex.png"
              alt="user"
            />
          </div>
        </div>
      </section>
      <section className="contents">
        {(!user) && <Login login1={login1} login2={login2}/>}
        {(user && selectedPage === 'profile') &&
          <MyProfile handlePageClick={handlePageClick} />
        }
        {selectedPage === 'friends' && <Friend />}
        {(user && selectedPage === 'chat') && <PrivateChat user={user.id} />}
        {(user && selectedPage === 'groupChat') && <GroupChat user={user.id} />}
        {(user && selectedPage === 'setting') &&
          <Setting handlePageClick={handlePageClick} />
        }
        {(user && selectedPage === 'events') && <Events user={user.id} event={event}/>}
        {(user && selectedPage === 'newEvent') && <NewEvent user={user.id} event={event}/>}

      </section>
    </main>
  );
}
