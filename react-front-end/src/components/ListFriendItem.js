import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import './FriendList.scss';


export default function ListFriendItem(props) {

  // const [friend, setFriend] = useState(false);
  const { friend, onUnfriend } = props;

  const searchResult = friend.friend_id.map(user => {
    const handleUnfriendClick = (e) => {
      e.preventDefault();
      onUnfriend(user);
    };
    
    return (
      <div 
        className="user-list border-radius20 display-flex" 
        key={user.table_id}
      >
        <div className="friend-user display-flex">
          <div className="thumbnail" style={{ backgroundImage: `url(${user.photo})` }}></div>
          <p className="font20 font-title-color">{user.first_name} {user.last_name}</p>
        </div>
        <div className="btns display-flex">
          <div className="btn">
            <button
              className='background-primary-color btn-style'
              // onClick={() => { setFriend(true) }}
            >
              Chat
            </button>
          </div>
          <div className="btn">
            <button
              className='background-bad-color btn-style'
              onClick={handleUnfriendClick}
            >
              Unfriend
            </button>
          </div>
        </div>
      </div>
    )
  });

  return (
    <>
      {searchResult}
    </>
  );
}      