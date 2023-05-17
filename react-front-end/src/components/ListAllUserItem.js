import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import './FriendList.scss';


export default function ListAllUserItem(props) {

  const [friend, setFriend] = useState(false);
  const { filteredUsers } = props;

  const searchResult = filteredUsers.map(user => {
    return (
    <div className="user-list border-radius20 display-flex" key={user.id}>
      <div className="friend-user display-flex">
        <div className="thumbnail" style={{ backgroundImage: `url(${user.photo})` }}></div>
        <p className="font20 font-title-color">{user.name}</p>
      </div>
      <div className="btns display-flex">
        {!friend && <div className="btn">
          <button
            className='background-primary-color btn-style'
            onClick={() => { setFriend(true) }}
          >
            Add
          </button>
        </div>}
        {friend &&<div className="btn">
          <button
            className='background-bad-color btn-style'
            onClick={() => { setFriend(false) }}
          >
          <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>}
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