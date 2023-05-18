import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import './FriendList.scss';


export default function ListAllUserItem(props) {
// new state for exist friend
// friends = [1, 2, 3] 
// users = [1, 2, 3, 4, 5, 6] 
// [4, 5, 6] only render
// if currentId is exist friend list 
// multiple state. Ready user and friend / compare it 
// total user != friend -> 

// 1. In your ListAllUserItem, you need to have both users, and friends array. 
// 2. You loop through all users, and check if this user also exist in friends array. If yes, then he is a friend, you show "Chat/Unfriend". If not, then he is not my friend, you show "Add" 
// 3. You "Add" button, should push this user into friends array. So when you click add, the user become your friend, the button change 
// 4. Your "Unfriend" button, will remove this user from "friends" array. So once you click, it is no longer your friends 


  const [beFriend, setBeFriend] = useState(false);
  const { filteredUsers, onUnfriend } = props;
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
  
  const searchResult = filteredUsers.map(user => {

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