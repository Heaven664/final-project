import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ListFriendItem from './ListFriendItem';
import { getFriendsIds, getTableIds, getFriendsObjects, findFriendlist } from 'helpers/getFriendFunc';

export default function ListFriend(props) {

  // friends render
  const [friend, setFriend] = useState({
    user_id: props.user,
    friend_id: [],
  });

  const storedUser = sessionStorage.getItem('user');
  const currentUser = JSON.parse(storedUser)?.id;

  // searching
  const [value, setValue] = useState("");
  const [friendlist, setFriendlist] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  const reload = () => setReloadFlag(prev => !prev);

  // const [filteredUsers, setFilteredUsers] = useState([friend]);
  const delayTimerRef = useRef(null);

  // get the friends list
  const fetchFriends = () => {
    Promise.all([
      axios.get("/api/users"),
      axios.get("api/friendlists")
    ]).then(
      (all) => {
        // Update friendlist 
        setFriendlist(all[1].data);

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
  }, [value, reloadFlag]);

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


  const unfriend = (user) => {
    const userId = currentUser;
    const friendId = user.id;

    const friendListId = findFriendlist(friendlist, userId, friendId);
    axios.delete(`/api/friendlists/${friendListId}/delete`)
      .then((res) => console.log(res.data))
      .then(() => reload())
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




