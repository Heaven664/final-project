import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ListAllUserItem from './ListAllUserItem';
import {getFriendsIds, getTableIds, getFriendsObjects} from 'helpers/getFriendFunc';

export default function ListAllUser(props) {

  const [value, setValue] = useState("a");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const delayTimerRef = useRef(null);

  // friends render
  const [friend, setFriend] = useState({
    user_id: 2,
    friend_id: [],
  });

  useEffect(() => {
    if (value === "") return;
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

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/users"),
  //     axios.get("api/friendlists")
  //   ]).then(
  //     (all) => {
  //       // my friend's id array []
  //       const friendIds = getFriendsIds(all[1].data, friend.user_id);

  //       // that table's id array []
  //       const tableIds = getTableIds(all[1].data, friend.user_id);

  //       // my friend's info [{}]
  //       const friendLists = getFriendsObjects(all[0].data, friendIds);

  //       // add friendlist's table id
  //       const updatedData = friendLists.map((obj, index) => {
  //         return {
  //           ...obj,
  //           table_id: tableIds[index]
  //         };
  //       });

  //       // add name key-value
  //       const modifiedUsers = updatedData.map((user) => {
  //         const name = user.first_name + " " + user.last_name;
  //         return { ...user, name };
  //       });

  //       setFriend((prev) => ({
  //         ...prev,
  //         friend_id: modifiedUsers,
  //       }));
  //     }
  //   );
  // }, []);


  // useEffect(() => {
  //   if (value === "") return;
  //   clearTimeout(delayTimerRef.current);
  //   delayTimerRef.current = setTimeout(() => {
  //     const users = friend.friend_id;

  //     // case sensitive off
  //     const filteredResults = users.filter((user) => {
  //       const fullName = (user.first_name + user.last_name).toLowerCase();
  //       const searchValue = value.toLowerCase();
  //       return fullName.includes(searchValue);
  //     });

  //     setFriend((prev) => ({
  //       ...prev,
  //       friend_id: filteredResults,
  //     }));
  //   }, 400);

  //   return () => {
  //     clearTimeout(delayTimerRef.current);
  //   };
  // }, [value]);


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


  const unfriend = (user) => {
    const data = {
      id: user.table_id,
      user_id: friend.user_id,
      friend_id: user.id
    };
    console.log("delete data: ", data);

    axios.delete(`/api/friendlists/${data.id}/delete`, data)
      .then(res => {
        console.log(res.data);
      })
      // .then(fetchFriends(friend, setFriend))
      .catch(err => console.log(err))
  };

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
        onUnfriend={unfriend}
      />
    </>
  );
}
