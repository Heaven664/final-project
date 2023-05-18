import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';


// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import NavThumbnail from "./NavThumbnail";
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

  const storedUser = sessionStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(currentUser);
  const [event, setEvent] = useState(null);

  sessionStorage.setItem('user', JSON.stringify(user));

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

  const logout = () => {
    axios.post('/api/logout')
      .then((res) => console.log(res.data))
      .then(() => {
        // sessionStorage.removeItem('user');
        setUser(null);
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
              ${page === 'newEvent' ? '--selected' : ''}`}
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
            <li className='events'
              onClick={logout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
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
          {!user && <NavThumbnail handlePageClick={handlePageClick} />}
          {user &&
            <NavThumbnail handlePageClick={handlePageClick} user={user.id} />
          }
        </div>
      </section>
      <section className="contents">
        {(!user) && <Login login1={login1} login2={login2} />}
        {(user && page === 'profile') &&
          <MyProfile handlePageClick={handlePageClick} user={user.id}/>
        }
        {(user && page) === 'friends' && <Friend user={user.id} />}
        {(user && page === 'chat') && <PrivateChat user={user.id} />}
        {(user && page === 'groupChat') && <GroupChat user={user.id} />}
        {(user && page === 'events') && <Events user={user.id} event={event}/>}
        {(user && page === 'newEvent') && <NewEvent user={user.id} event={event}/>}
        {(user && page === 'setting') &&
          <Setting handlePageClick={handlePageClick} user={user.id}/>
        }

      </section>
    </main>
  );
}
