import React, { useState, useEffect } from "react";
import axios from "axios";
import './FriendList.scss';
import FriendListItem from './FriendListItem';


// 1. call friendlists
// 2. call user with friend_id 
// 3. modify the data: number -> friend's user info
// 4. data = {id:1, user_id:1, friend_id: {id:.., name:.. ....}}
// 5. map with this array

export default function FriendList(props) {
  // const [state, setState] = useState({
  //   id:"",
  //   user_id: 1,
  //   friend_id: "",
  //   name: "",
  //   photo: ""
  // });
  const friendArray = props.friendList;
  const listOfFriends = friendArray.map((eachFriend) => {
    return (
      <FriendListItem
        key={eachFriend.id}
        name={eachFriend.name}
        photo={eachFriend.photo}
        handleButtonClick={props.handleButtonClick}
      />
    )
  });

  return (
    <div className="friend-list border-radius15 display-flex">
      {listOfFriends}
    </div>
  );
}




