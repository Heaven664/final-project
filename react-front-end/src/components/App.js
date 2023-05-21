import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {Route, BrowserRouter as Router, Routes, Link} from 'react-router-dom';


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
import Events from "./Events/Events";
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
              ${page === 'my-profile' ? '--selected' : ''}`}>
                              <Link to="/myprofile">
              <FontAwesomeIcon icon={faUser} /><br />
              <span>My Profile</span></Link>
            </li>
            <li className={`friends 
              ${page === 'friends' ? '--selected' : ''}`}>
                <Link to="/friends">
              <FontAwesomeIcon icon={faUsers} /><br />
              <span>Friends</span></Link>
            </li>
            <li className={`chat 
              ${page === 'chat' ? '--selected' : ''}`}>
                 <Link to="/chat">
              <FontAwesomeIcon icon={faComment} /><br />
              <span>Chat</span></Link>
            </li>
            <li className={`groupChat 
              ${page === 'groupChat' ? '--selected' : ''}`}>
                <Link to="/groupchat">
              <FontAwesomeIcon icon={faComments} /><br />
              <span>Group Chat</span></Link>
            </li>
            <li className={`events 
              ${page === 'events' ? '--selected' : ''}`}>
              <Link to="/events">
              <FontAwesomeIcon icon={faCakeCandles} /><br />
              <span>Events</span>
              </Link>
            </li>
            <li className={`myEvent 
              ${page === 'newEvent' ? '--selected' : ''}`}>
                <Link to="/newevent">
              <FontAwesomeIcon icon={faCalendarPlus} /><br />
              <span>New Event</span></Link>
            </li>
            <li className={`setting 
              ${page === 'setting' ? '--selected' : ''}`}>
                 <Link to="/newevent">
              <FontAwesomeIcon icon={faGear} /><br /></Link>
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

        <Routes>
        {/* {(!user) && <Login login1={login1} login2={login2} />}
        {((user && page === 'profile') || (user && page === 'my-profile') )&&
          <MyProfile userId={profileID} reload={updateApp} />
        }
        {(user && page) === 'friends' && <Friend user={user.id} />}
        {(user && page === 'chat') && <PrivateChat user={user.id} />}
        {(user && page === 'groupChat') && <GroupChat user={user.id} />}
        {(user && page === 'setting') &&
          <Settings user={user.id} />
        }
        <Route path="/myprofile" element={<MyProfile userId={profileID} reload={updateApp} />} /> */}
          <Route path="/friends" element={<Friend user={user.id} />} />
          <Route path="/chat" element={<PrivateChat user={user.id} />} />
          <Route path="/groupchat" element={<GroupChat user={user.id} />} />
          <Route path="/setting" element={<Settings user={user.id} />} />
          <Route path="/newevent" element={<NewEvent user={user.id} />} />

          <Route path="/events" element={<EventsList user={user.id} />} />
          <Route path="/events/*" element={<Events user={user.id} />} />
        </Routes>

      </section>
    </main>
  );
}
