import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ListAllUserItem from './ListAllUserItem';
import { getFriendsIds } from 'helpers/getFriendFunc';

export default function ListAllUser(props) {

  // searching
  const [value, setValue] = useState("");
  // const [friend, setFriend] = useState(null);
  const delayTimerRef = useRef(null);

  // user render
  const [allUser, setAllUser] = useState({
    user_id: props.user,
    user_not_friend: []
  });

  // get the user list
  const fetchFriends = (allUser, setAllUser) => {
    Promise.all([
      axios.get("/api/users"),
      axios.get("api/friendlists")
    ]).then(
      (all) => {
        // my friend's id array []
        const friendIds = getFriendsIds(all[1].data, allUser.user_id);

        // add name key-value
        const modifiedUsers = all[0].data.map((user) => {
          const name = user.first_name + " " + user.last_name;
          return { ...user, name };
        });

        // get the User who are not friend and userself
        const notFriendUser = modifiedUsers.filter(user => {
          return !friendIds.includes(user.id) && user.id !== allUser.user_id;
        });

        setAllUser((prev) => ({
          ...prev,
          user_not_friend: notFriendUser,
        }));

      }
    );
  };


  // Usage in useEffect hook
  useEffect(() => {
    fetchFriends(allUser, setAllUser);
  }, [value]);

  // searching user
  const [searchResults, setSearchResults] = useState([]);

  // searching
  const searchUsers = (searchTerm) => {
    console.log("searching ...", searchTerm);

    const users = allUser.user_not_friend;

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
      setSearchResults(allUser.user_not_friend);
    } else {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = setTimeout(() => {
        searchUsers(value);
        console.log("searching value", value);
      }, 400);
      return () => {
        clearTimeout(delayTimerRef.current);
      };
    }
  }, [value, allUser.user_not_friend]);

  // add friend function
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

  // delete friend
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
        searchResults={searchResults}
        onAddFriend={addFriend}
        onUnfriend={unfriend}
      />
    </>
  );
}

