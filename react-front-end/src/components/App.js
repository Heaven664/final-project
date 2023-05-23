import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';


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
import MyEventsList from "./Events/MyEventsList";
import Events from "./Events/Events";
import MyEvents from "./Events/MyEvents";
import { friendContext } from 'providers/FriendProvider';
import ProtectedRoute from "./Other/ProtectedRoute";
import Profile from "./Profiles/Profile";
import Memories from "./Events/Memories";
import EditEvent from "./Events/EditEvent/EditEventInfo";
import EditGuest from "./Events/EditEvent/EditEventGuest";

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
  const [updated, setUpdated] = useState(false);

  sessionStorage.setItem('user', JSON.stringify(user));

  const openMyProfile = () => {
    // reload();
    changeProfileId(currentUser?.id);
    console.log('myprofile', currentUser?.id);
    changePage('my-profile');
  };

  // Login user on the server
  const login1 = function() {
    axios.post("api/login")
      .then(res => {
        setUser(res.data);
        alert("Logged in as user id = 1, redirecting to events page now!");
      })
      .catch(err => {
        console.log("Login:", err.message);
      });
  };

  // Login user on the server
  const login2 = function() {
    axios.post("api/login/1")
      .then(res => {
        setUser(res.data);
        alert("Logged in as user id = 2, redirecting to events page now!");
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
            <Link to="/myprofile">
              <li className={`profile 
              ${page === 'my-profile' ? '--selected' : ''}`}
                onClick={(e) => { openMyProfile(); }}
              >
                <FontAwesomeIcon icon={faUser} /><br />
                <span>My Profile</span>
              </li>
            </Link>
            <Link to="/friends">
              <li className={`friends 
              ${page === 'friends' ? '--selected' : ''}`}
                onClick={() => { changePage("friends"); }}
              >

                <FontAwesomeIcon icon={faUsers} /><br />
                <span>Friends</span>

              </li>
            </Link>

            <Link to="/chat">
              <li className={`chat 
              ${page === 'chat' ? '--selected' : ''}`}
                onClick={() => { changePage("chat"); }}
              >

                <FontAwesomeIcon icon={faComment} /><br />
                <span>Chat</span>

              </li>
            </Link>

            <Link to="/groupchat">
              <li className={`groupChat 
              ${page === 'groupChat' ? '--selected' : ''}`}
                onClick={() => { changePage("groupChat"); }}
              >

                <FontAwesomeIcon icon={faComments} /><br />
                <span>Group Chat</span>

              </li>
            </Link>

            <Link to="/myevents">
              <li className={`events 
              ${page === 'events' ? '--selected' : ''}`}
                onClick={() => { changePage("events"); }}
              >

                <FontAwesomeIcon icon={faCakeCandles} /><br />
                <span>Events</span>

              </li>
            </Link>

            <Link to="/newevent">
              <li className={`myEvent 
              ${page === 'newEvent' ? '--selected' : ''}`}
                onClick={() => { changePage("newEvent"); }}
              >

                <FontAwesomeIcon icon={faCalendarPlus} /><br />
                <span>New Event</span>

              </li>
            </Link>

            <Link to="/setting">
              <li className={`setting 
              ${page === 'setting' ? '--selected' : ''}`}
                onClick={() => { changePage("setting"); }}
              >

                <FontAwesomeIcon icon={faGear} /><br />

              </li>
            </Link>

            <li className='logout button-active'
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

          {!user &&
            <NavThumbnail />
          }

          {user &&
            <NavThumbnail user={user.id} userUpdated={updated} />
          }

        </div>
      </section>
      <section className="contents">
        {/* {(!user) && <Login login1={login1} login2={login2} />}
        {((user && page === 'profile') || (user && page === 'my-profile') )&&
          <MyProfile userId={profileID} reload={updateApp} />
        }
        {(user && page) === 'friends' && <Friend user={user.id} />}
        {(user && page === 'chat') && <PrivateChat user={user.id} />}
        {(user && page === 'groupChat') && <GroupChat user={user.id} />}
        {(user && page === 'setting') &&
          <Settings user={user.id} setUserUpdated={setUpdated}/>
        }
        {(user && page === 'events') && <EventsList user={user.id}/>}
        {(user && page === 'newEvent') && <NewEvent user={user.id}/>} */}

        <Routes>

          <Route path="/login" element={<Login login1={login1} login2={login2} />} />

          <Route element={<ProtectedRoute user={user?.id} />}>
            <Route path="/*" element={<h1>ERROR 404: NOT FOUND. < br/>< br/>How did you end up here? 😄</h1>} />
            <Route path="/friends" element={<Friend user={user?.id} />} />
            <Route path="/chat" element={<PrivateChat user={user?.id} />} />
            <Route path="/groupchat" element={<GroupChat user={user?.id} />} />
            <Route path="/setting" element={<Settings user={user?.id} />} />
            <Route path="/newevent" element={<NewEvent user={user?.id} />} />
            <Route path="/profile" element={<Profile user={user?.id} />} />
            <Route path="/myprofile" element={<MyProfile user={user?.id} />} />

            <Route path="/login" element={<Login user={user?.id} />} />
            <Route path="/events" element={<EventsList user={user?.id} />} />
            <Route path="/myevents" element={<MyEventsList user={user?.id} />} />
            <Route path="/events/:id" element={<Events user={user?.id} />} />
            <Route path="/editevent/:id" element={<EditEvent user={user?.id} />} />
            <Route path="/manageguests/:id" element={<EditGuest user={user?.id} />} />
            <Route path="/myevents/:id" element={<MyEvents user={user?.id} />} />
            <Route path="/memories/:id" element={<Memories user={user?.id} />} />
          </Route>
        </Routes>

      </section>
    </main>
  );
}
