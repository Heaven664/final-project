import React, { useState } from "react";

// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

import MyProfile from './MyProfile';
// import PrivateChat from 'components/PrivateChat';

// import MenuList from "components/MenuList.js";

export default function App(props) {

  const [selectedPage, setSelectedPage] = useState("chat");
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
          <div>
            <img
              className="user-profile-pic"
              src="images/user_ex.png"
              alt="user"
            />
          </div>
        </div>
      </section>
      <section className="contents">
        {selectedPage === 'profile' && <MyProfile />}
        {/* {selectedPage === 'chat' && <PrivateChat />} */}
      </section>
    </main>
  );
}
