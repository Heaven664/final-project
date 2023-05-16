import React, { useState } from "react";

// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

import MyProfile from './MyProfile';
import PrivateChat from 'components/PrivateChat';
import Setting from 'components/Setting';
import Login from 'components/Login';
import axios from 'axios';

export default function App(props) {

  const [user, setUser] = useState(null);

  // Login user on the server
  const login = function (email, password) {
    axios.post("api/login", { email, password })
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.log("Login:", err.message);
      });
  };

  // Logout a user
  const logout = function () {
    console.log("logout");
    axios.post("api/logout", {})
      .then(() => {
        setUser(null);
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
              ${selectedPage === 'myEvent' ? '--selected' : ''}`}
              onClick={() => handlePageClick('myEvent')}>
              <FontAwesomeIcon icon={faCalendarPlus} /><br />
              <span>My Event</span>
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
        {!user && <Login login={login} />}
        {(user && selectedPage === 'profile') &&
          <MyProfile handlePageClick={handlePageClick} />
        }
        {(user && selectedPage === 'chat') && <PrivateChat />}
        {(user && selectedPage === 'setting') &&
          <Setting handlePageClick={handlePageClick} />
        }
      </section>
    </main>
  );
}
