import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import './Friend.scss';

import ListFriend from './ListFriend';
import ListAllUser from './ListAllUser';


// additional feature
// friends counting
// 친구랑 채팅했던 기록이 있는지 확인하고 새 채팅하기 or 메세지 줌 인 이런식으로 만들어보기

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
          <ListFriend></ListFriend>
        }

        {list === 'allUsers' &&
          <ListAllUser></ListAllUser>
        }
      </div>

    </div>
  );
}



{/* <Friend>

  const [list, SetList] = useState('friendList');

  <ListAllUser userList>
    <input> field and function
    <ListAllUserItem>
    </ListAllUserItem>
  </ListAllUser>

  <ListFriend friendList>
    <input> field and function
    <FriendListItem>
    </FriendListItem>
  </ListFriend>

</Friend> */}
