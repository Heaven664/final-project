import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';


// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons';

import MyProfile from './MyProfile';
import Friend from './Friend';
import PrivateChat from 'components/PrivateChat';
import GroupChat from 'components/GroupChat';
import Setting from 'components/Setting';
import Login from 'components/Login';
import Events from "./Events/Events";
import NewEvent from "./NewEvents/NewEvent";
import { friendContext } from 'providers/FriendProvider';

import './App.scss';

export default function App(props) {

  const { page, changePage } = useContext(friendContext);

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

  function handlePageClick(page) {
    changePage(page);
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <nav className="sidebar__menu">
          <ul>
            <li className={`profile 
              ${page === 'profile' ? '--selected' : ''}`}
              onClick={() => handlePageClick('profile')}>
              <FontAwesomeIcon icon={faUser} /><br />
              <span>My Profile</span>
            </li>
            <li className={`friends 
              ${page === 'friends' ? '--selected' : ''}`}
              onClick={() => handlePageClick('friends')}>
              <FontAwesomeIcon icon={faUsers} /><br />
              <span>Friends</span>
            </li>
            <li className={`chat 
              ${page === 'chat' ? '--selected' : ''}`}
              onClick={() => handlePageClick('chat')}>
              <FontAwesomeIcon icon={faComment} /><br />
              <span>Chat</span>
            </li>
            <li className={`groupChat 
              ${page === 'groupChat' ? '--selected' : ''}`}
              onClick={() => handlePageClick('groupChat')}>
              <FontAwesomeIcon icon={faComments} /><br />
              <span>Group Chat</span>
            </li>
            <li className={`events 
              ${page === 'events' ? '--selected' : ''}`}
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
              ${page === 'setting' ? '--selected' : ''}`}
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
        {(!user) && <Login login1={login1} login2={login2} />}
        {(user && page === 'profile') &&
          <MyProfile handlePageClick={handlePageClick} />
        }
        {(user && page) === 'friends' && <Friend />}
        {(user && page === 'chat') && <PrivateChat user={user.id} />}
        {(user && page === 'groupChat') && <GroupChat user={user.id} />}
        {(user && page === 'setting') &&
          <Setting handlePageClick={handlePageClick} />
        }
        {(user && selectedPage === 'events') && <Events user={user.id} event={event}/>}
        {(user && selectedPage === 'newEvent') && <NewEvent user={user.id} event={event}/>}

      </section>
    </main>
  );
}
