import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ListAllUserItem from './ListAllUserItem';

export default function ListAllUser(props) {

  const [value, setValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const delayTimerRef = useRef(null);

  useEffect(() => {

    clearTimeout(delayTimerRef.current);

    delayTimerRef.current = setTimeout(() => {
      axios.get("/api/users")
        .then((res) => {
          const users = res.data;

          // add name key
          const modifiedUsers = users.map((user) => {
            const name = user.first_name + " " + user.last_name;
            return { ...user, name };
            // return setState((prev) => ({ ...prev, name: userName }));
          });

          const filteredResults = modifiedUsers.filter((user) => {
            const fullName = (user.first_name + user.last_name).toLowerCase();
            const searchValue = value.toLowerCase();
            return fullName.includes(searchValue);
          });
          setFilteredUsers(filteredResults);

        });
    }, 400);

    return () => {
      clearTimeout(delayTimerRef.current);
    };
  }, [value]);

  // const unfriend = (e) => {
  //   e.preventDefault()
  //   const data = {
  //     user_id: state.user_id,
  //     friend_id: state.friend_id
  //   }
  //   console.log("deleted: ", data);
  //   axios.delete(`/api/friendlists/${state.id}/delete`, data)
  //     .then(res => {
  //       console.log(res.data);
  //       props.handleListClick('myFriends');
  //     })
  //     .catch(err => console.log(err))
  // };

  // // Gets friend's id's of a user with provided id
  // const getFriendsIds = (friendlists, id) => {
  //   // Filter friendlists to get needed objects
  //   const friendObjects = friendlists.filter(
  //     (friendlist) => friendlist.user_id === id
  //   );
  //   // Get ids from the objects
  //   return friendObjects.map((friend) => friend.friend_id);
  // };

  // // Gets user objects with ids from friends id array
  // const getFriendsObjects = (users, friends) => {
  //   return users.filter((user) => friends.includes(user.id));
  // };

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/users"),
  //     axios.get("api/friendlists")
  //   ]).then(
  //     (all) => {
  //       // my friend's id array []
  //       const friendIds = getFriendsIds(all[1].data, state.user_id);
  //       // my friend's info [{}]
  //       const friendLists = getFriendsObjects(all[0].data, friendIds);
  //       console.log("all: ", all, "friendIds: ", friendIds, "friendLists: ", friendLists)
  //       setState((prev) => ({
  //         ...prev,
  //         friend_id: friendLists,
  //       }));
  //     }
  //   );
  // }, [state.user_id]);
  // console.log("state: ", state)

  return (
    <>
      <div className="search-bar border-radius20">
        <form onSubmit={event => event.preventDefault()}>
          <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input
            type="text" name="name" className="border-radius15"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      </div>
      <ListAllUserItem
        filteredUsers={filteredUsers}
      />
    </>
  );
}


// 1. call friendlists
// 2. call user with friend_id 
// 3. modify the data: number -> friend's user info
// 4. data = {id:1, user_id:1, friend_id: {id:.., name:.. ....}}
// 5. map with this array