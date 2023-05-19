import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ListFriendItem from './ListFriendItem';
import { getFriendsIds, getTableIds, getFriendsObjects } from 'helpers/getFriendFunc';

export default function ListFriend(props) {

  // friends render
  const [friend, setFriend] = useState({
    user_id: props.user,
    friend_id: [],
  });

  // searching
  const [value, setValue] = useState("");
  // const [filteredUsers, setFilteredUsers] = useState([friend]);
  const delayTimerRef = useRef(null);

  // get the friends list
  const fetchFriends = () => {
    Promise.all([
      axios.get("/api/users"),
      axios.get("api/friendlists")
    ]).then(
      (all) => {
        // my friend's id array []
        const friendIds = getFriendsIds(all[1].data, friend.user_id);

        // that table's id array []
        const tableIds = getTableIds(all[1].data, friend.user_id);

        // my friend's info [{}]
        const friendLists = getFriendsObjects(all[0].data, friendIds);

        // add friendlist's table id
        const updatedData = friendLists.map((obj, index) => {
          return {
            ...obj,
            table_id: tableIds[index]
          };
        });
        // console.log("friendIds", friendIds);
        // console.log("tableIds", tableIds);
        // console.log("friendLists", friendLists);

        // add name key-value
        const modifiedUsers = updatedData.map((user) => {
          const name = user.first_name + " " + user.last_name;
          // console.log("receving data", user.id, user.table_id);

          return { ...user, name };
        });

        setFriend((prev) => ({
          ...prev,
          friend_id: modifiedUsers,
        }));
      }
    );
  };

  // Usage in useEffect hook
  useEffect(() => {
    fetchFriends();
  }, [value]);

  // searching user
  const [searchResults, setSearchResults] = useState([]);

  // searching
  const searchUsers = (searchTerm) => {

    const users = friend.friend_id;

    // case sensitive off
    const filteredResults = users.filter((user) => {
      const fullName = user.name.toLowerCase();
      const searchValue = searchTerm.toLowerCase();
      return fullName.includes(searchValue);
    });

    setSearchResults(filteredResults);
  };

  // when value is changed
  useEffect(() => {
    if (value === "") {
      setSearchResults(friend.friend_id);
    } else {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = setTimeout(() => {
        searchUsers(value);
      }, 400);
      return () => {
        clearTimeout(delayTimerRef.current);
      };
    }
  }, [value]);

  // delete friend
  const unfriend = (user) => {
    const data = {
      id: user.table_id,
      user_id: friend.user_id,
      friend_id: user.id
    };

    axios.delete(`/api/friendlists/${data.id}/delete`, data)
      .then(res => {
        // filter out just removed
        const friendArr = friend.friend_id.filter((element) => {
          return element.id !== data.friend_id;
        });
        setFriend((prev) => {
          return {
            ...prev,
            friend_id: friendArr
          };
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="search-bar border-radius20">
        <form onSubmit={event => event.preventDefault()}>
          <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input
            type="text" name="name"
            className="border-radius15"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      </div>
      <ListFriendItem
        friend={friend}
        searchResults={searchResults}
        onUnfriend={unfriend}
      />
    </>
  );
}




