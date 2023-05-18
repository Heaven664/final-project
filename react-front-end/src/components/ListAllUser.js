import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ListAllUserItem from './ListAllUserItem';
import { getFriendsIds, getTableIds, getFriendsObjects } from 'helpers/getFriendFunc';

export default function ListAllUser(props) {

  // searching
  const [value, setValue] = useState("");
  // const [friend, setFriend] = useState(null);
  const delayTimerRef = useRef(null);

  // friends render
  const [allUser, setAllUser] = useState({
    user_id: props.user,
    user_not_friend: []
  });

  // // added friend
  // const [addedFriend, setAddedFriend] = useState({
  //   user_id: props.user,
  //   friend_id: [],
  // })

  // get the user list
  const fetchFriends = (allUser, setAllUser) => {
    Promise.all([
      axios.get("/api/users"),
      axios.get("api/friendlists")
    ]).then(
      (all) => {
        // all[0].data: user data ,all[1].data: friendlist data

        // my friend's id array []
        const friendIds = getFriendsIds(all[1].data, allUser.user_id);

        // that table's id array []
        const tableIds = getTableIds(all[1].data, allUser.user_id);

        // my friend's info [{}]
        const friendLists = getFriendsObjects(all[0].data, friendIds);

        // add name key-value
        const modifiedUsers = all[0].data.map((user) => {
          const name = user.first_name + " " + user.last_name;
          return { ...user, name};
        });

        // get the User who are not friend and userself
        const notFriendUser = modifiedUsers.filter(user => {
          return !friendIds.includes(user.id) && user.id !== allUser.user_id;
        });

        // add friendlist's table id
        const updatedData = modifiedUsers.map((obj, index) => {
          return {
            ...obj,
            friend_id: tableIds[index]
          };
        });

        // console.log("friendIds:", friendIds, "notFriendUser: ", notFriendUser);

        setAllUser((prev) => ({
          ...prev,
          user_not_friend: notFriendUser,
        }));

        // setAddedFriend((prev) => ({
        //   ...prev,
        //   user_not_friend: updatedData,
        // }));
      }
    );
  };

  // Usage in useEffect hook
  useEffect(() => {
    fetchFriends(allUser, setAllUser);
  }, []);


  useEffect(() => {
    if (value === "") return;
    clearTimeout(delayTimerRef.current);
    delayTimerRef.current = setTimeout(() => {
      const users = allUser.user_not_friend;

      // case sensitive off
      const filteredResults = users.filter((user) => {
        const fullName = (user.first_name + user.last_name).toLowerCase();
        const searchValue = value.toLowerCase();
        return fullName.includes(searchValue);
      });

      setAllUser((prev) => ({
        ...prev,
        user_not_friend: filteredResults,
      }));
    }, 400);

    return () => {
      clearTimeout(delayTimerRef.current);
    };
  }, [value]);

  const addFriend = (user) => {
    const data = {
      user_id: allUser.user_id,
      friend_id: user.id
    };

    axios.post(`/api/friendlists`, data)
      .then(res => {
        console.log("Add Friend data: ", res.data);

        const modifiedUsers = allUser.user_not_friend.map((user) => {
          if (user.id === data.friend_id) {
            return {
              ...user,
              table_id: res.data[0].id
            };
          }
          return user;
        });
        setAllUser((prev) => ({
          ...prev,
          user_not_friend: modifiedUsers,
        }));

      })
      .catch(err => console.log(err));
  };


  const unfriend = (user) => {
    const data = {
      id: user.table_id,
      user_id: allUser.user_id,
      friend_id: user.id
    };
    console.log("delete data: ", data);

    axios.delete(`/api/friendlists/${data.id}/delete`, data)
      .then(res => {
        console.log(res.data);

        const modifiedUsers = allUser.user_not_friend.map((user) => {
          if (user.id === data.friend_id) {
            return {
              ...user,
              table_id: null
            };
          }
          return user;
        });
        setAllUser((prev) => ({
          ...prev,
          user_not_friend: modifiedUsers,
        }));
      })
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
        allUser={allUser}
        onAddFriend={addFriend}
        onUnfriend={unfriend}
      />
    </>
  );
}

