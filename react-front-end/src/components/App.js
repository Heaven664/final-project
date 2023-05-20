import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';


// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import NavThumbnail from "components/Other/NavThumbnail";
import MyProfile from './Profiles/MyProfile';
import Friend from './Friendlists/Friend';
import PrivateChat from 'components/Chats/PrivateChat';
import GroupChat from 'components/Chats/GroupChat';
import Settings from 'components/Settings/Settings';
import Login from 'components/Other/Login';
import NewEvent from "./NewEvents/NewEvent";
import EventsList from "./Events/EventsList";
import { friendContext } from 'providers/FriendProvider';

import './App.scss';

export default function App(props) {

  const { page, changePage, profileID, changeProfileId } = useContext(friendContext);

  const storedUser = sessionStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(currentUser);
  const [updateApp, setUpdateApp] = useState(false);

  const reload = () => {
    setUpdateApp(prev => !prev);
  };

  sessionStorage.setItem('user', JSON.stringify(user));

  const openMyProfile = () => {
    reload();
    changeProfileId(currentUser?.id)
    changePage('my-profile');
  };

  // Login user on the server
  const login1 = function () {
    axios.post("api/login")
      .then(res => {
        setUser(res.data);
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
      })
      .catch(err => {
        console.log("Login:", err.message);
      });
  };

  const logout = () => {
    axios.post('/api/logout')
      .then(() => {
        sessionStorage.clear();
        setUser(null);
      });
  };

  return (
    <main className="layout">
      <section className="sidebar">
        <nav className="sidebar__menu">
          <ul>
            <li className={`profile 
              ${page === 'my-profile' ? '--selected' : ''}`}
              onClick={openMyProfile}>
              <FontAwesomeIcon icon={faUser} /><br />
              <span>My Profile</span>
            </li>
            <li className={`friends 
              ${page === 'friends' ? '--selected' : ''}`}
              onClick={() => changePage('friends')}>
              <FontAwesomeIcon icon={faUsers} /><br />
              <span>Friends</span>
            </li>
            <li className={`chat 
              ${page === 'chat' ? '--selected' : ''}`}
              onClick={() => changePage('chat')}>
              <FontAwesomeIcon icon={faComment} /><br />
              <span>Chat</span>
            </li>
            <li className={`groupChat 
              ${page === 'groupChat' ? '--selected' : ''}`}
              onClick={() => changePage('groupChat')}>
              <FontAwesomeIcon icon={faComments} /><br />
              <span>Group Chat</span>
            </li>
            <li className={`events 
              ${page === 'events' ? '--selected' : ''}`}
              onClick={() => changePage('events')}>
              <FontAwesomeIcon icon={faCakeCandles} /><br />
              <span>Events</span>
            </li>
            <li className={`myEvent 
              ${page === 'newEvent' ? '--selected' : ''}`}
              onClick={() => changePage('newEvent')}>
              <FontAwesomeIcon icon={faCalendarPlus} /><br />
              <span>New Event</span>
            </li>
            <li className={`setting 
              ${page === 'setting' ? '--selected' : ''}`}
              onClick={() => changePage('setting')}>
              <FontAwesomeIcon icon={faGear} /><br />
            </li>
            <li className='logout'
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
          {!user && <NavThumbnail />}
          {user &&
            <NavThumbnail user={user.id} />
          }

        </div>
      </section>
      <section className="contents">
        {(!user) && <Login login1={login1} login2={login2} />}
        {((user && page === 'profile') || (user && page === 'my-profile') )&&
          <MyProfile userId={profileID} reload={updateApp} />
        }
        {(user && page) === 'friends' && <Friend user={user.id} />}
        {(user && page === 'chat') && <PrivateChat user={user.id} />}
        {(user && page === 'groupChat') && <GroupChat user={user.id} />}
        {(user && page === 'setting') &&
          <Settings user={user.id} />
        }
        {(user && page === 'events') && <EventsList user={user.id}/>}
        {(user && page === 'newEvent') && <NewEvent user={user.id}/>}

      </section>
    </main>
  );
}
