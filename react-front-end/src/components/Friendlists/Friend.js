import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import './Friend.scss';

import ListFriend from './ListFriend';
import ListAllUser from './ListUsers';


// additional feature
// friends counting

export default function Friend(props) {

  // change the search list/ myfriend <-> database
  const [list, setList] = useState("myFriends");
  function handleListClick(section) {
    setList(section);
  }

  return (
    <div className="friend-box background-box-color border-radius20 box-shadow">
      <div className="search-section">
        <div className="friend-tab display-flex">

          <div className="btn">
            <button
              className={`btn-style
              ${list === 'myFriends' ? '--selected' : ''}`}
              onClick={() => handleListClick('myFriends')}
            >
              <FontAwesomeIcon icon={faUsers} /> My Friend
            </button>
          </div>

          <div className="btn">
            <button
              className={`btn-style
              ${list === 'allUsers' ? '--selected' : ''}`}
              onClick={() => handleListClick('allUsers')}
            >
              <FontAwesomeIcon icon={faUserPlus} /> Add New Friend
            </button>
          </div>
        </div>

        {list === 'myFriends' &&
          <ListFriend user={props.user.id}></ListFriend>
        }

        {list === 'allUsers' &&
          <ListAllUser user={props.user.id}></ListAllUser>
        }
      </div>

    </div>
  );
}

