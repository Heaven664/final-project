import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import './FriendList.scss';


export default function EventsListItem(props) {


  const searchResult = filteredUsers.map(user => {

    const handleUnfriendClick = (e) => {
      e.preventDefault();

      if (beFriend) {
        // delete friend
        setBeFriend(false);
        console.log("delete??", beFriend);
        // onUnfriend(false);
      }
      else {
        // add friend
        setBeFriend(true);
        console.log("add??", beFriend);
      }
    };
    
    console.log("!!", beFriend);

    return (
      <div className="user-list border-radius20 display-flex" key={user.id}>
        <div className="friend-user display-flex">
          <div className="thumbnail" style={{ backgroundImage: `url(${user.photo})` }}></div>
          <p className="font20 font-title-color">{user.name}</p>
        </div>
        <div className="btns display-flex">
          {!beFriend && <div className="btn">
            <button
              className='background-point-color btn-style'
              onClick={handleUnfriendClick}
            >
              Add
            </button>
          </div>}
          {beFriend &&
            <>
              <div className="btn">
                <button
                  className='background-primary-color btn-style'
                // onClick={move to chat page}
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
            </>
          }
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