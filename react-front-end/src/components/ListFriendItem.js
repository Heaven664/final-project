import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { friendContext } from 'providers/FriendProvider';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import './FriendList.scss';


export default function ListFriendItem(props) {

  const { textFriendWithId } = useContext(friendContext);

  // const [friend, setFriend] = useState(false);
  const { friend, onUnfriend } = props;

  const onMessage = (id) => {
    textFriendWithId(id);
  };

  const searchResult = friend.friend_id.map(user => {
    const handleUnfriendClick = (e) => {
      e.preventDefault();
      onUnfriend(user);
    };

    const handleMessageClick = () => {
      onMessage(user.id);
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
              onClick={handleMessageClick}
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
    );
  });

  return (
    <>
      {searchResult}
    </>
  );
}      