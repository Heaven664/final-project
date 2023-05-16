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
  const [state, setState] = useState({
    user_id: 1,
    friend_id: "",
    name: "",
    photo: ""
  });
  
  const unfriend = (e) => {
    e.preventDefault()
    const data = {
      user_id: state.user_id,
      friend_id: state.friend_id
    }
    console.log("deleted: ", data);
    // axios.delete(`/api/friendlists/${state.user_id}/delete`, data)
    //   .then(res => {
    //     console.log(res.data);
    //     props.handleSectionClick('myFriends');
    //   })
    //   .catch(err => console.log(err))
  };
  
  // Gets friend's id's of a user with provided id
  const getFriendsIds = (friendlists, id) => {
    // Filter friendlists to get needed objects
    const friendObjects = friendlists.filter(
      (friendlist) => friendlist.user_id === id
    );
    // Get ids from the objects
    return friendObjects.map((friend) => friend.friend_id);
  };
  
  // Gets user objects with ids from friends id array
  const getFriendsObjects = (users, friends) => {
    return users.filter((user) => friends.includes(user.id));
  };
  
  useEffect(() => {
    Promise.all([axios.get("/api/users"), axios.get("api/friendlists")]).then(
      (all) => {
        const friendIds = getFriendsIds(all[1].data, state.user_id);
        const chats = getFriendsObjects(all[0].data, friendIds);
        setState((prev) => ({
          ...prev,
          chats,
        }));
      }
    );
  }, [state.user_id]);
  
  
  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const users = res.data;
      const friend = users.find((user) => user.id === state.friend_id);
      setState((prev) => ({ ...prev, friend }));
    });
  }, [state.friend_id]);
  

  const friendList = friendArray.map((eachFriend) => {
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
      {friendList}
    </div>
  );
}




