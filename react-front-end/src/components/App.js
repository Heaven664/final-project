import React, { Component } from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';


// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import './App.scss';

// import MenuList from "components/MenuList.js";

export default function App(props) {

  return (
    <main className="layout">
      <section className="sidebar">
        <nav className="sidebar__menu">
          {/* <MenuList
          menus={state.menus}
          menu={state.menu}
          setMenu={setMenu}
        /> */}
          <ul>
            <li>
              <FontAwesomeIcon icon={faUser} /><br/>
              <span>My Profile</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faUsers} /><br/>
              <span>Friends</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faComment} /><br/>
              <span>Chat</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faComments} /><br/>
              <span>Group Chat</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCakeCandles} /><br/>
              <span>Events</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCalendarPlus} /><br/>
              <span>My Event</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faGear} /><br/>
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

      </section>
    </main>
  )
}
