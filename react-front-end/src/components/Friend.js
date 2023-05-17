import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import FriendList from './FriendList';
import './Friend.scss';


export default function Friend(props) {
  // change the search list/ myfriend <-> database
  const [selectedSection, setSelectedSection] = useState("myFriends");
  function handleSectionClick(section) {
    setSelectedSection(section);
  }

  const [state, setState] = useState({
    user_id: 1,
    friend_id: "",
  });

  const unfriend = (e) => {
    e.preventDefault()
    const data = {
      user_id: state.user_id,
      friend_id: state.friend_id
    }
    console.log("deleted: ", data);
    axios.delete(`/api/friendlists/${state.id}/delete`, data)
      .then(res => {
        console.log(res.data);
        props.handleSectionClick('myFriends');
      })
      .catch(err => console.log(err))
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
    Promise.all([
      axios.get("/api/users"),
      axios.get("api/friendlists")
    ]).then(
      (all) => {
        // my friend's id array []
        const friendIds = getFriendsIds(all[1].data, state.user_id);
        // my friend's info [{}]
        const friendLists = getFriendsObjects(all[0].data, friendIds);
        console.log("all: ", all, "friendIds: ", friendIds, "friendLists: ", friendLists)
        setState((prev) => ({
          ...prev,
          friend_id: friendLists,
        }));
      }
    );
  }, [state.user_id]);
  console.log("state: ", state)

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const users = res.data;
      const friend = users.find((user) => user.id === state.friend_id);
      setState((prev) => ({ ...prev, friend }));
    });
  }, [state.friend_id]);

  // 탭 형식으로 만들어서 동시에 버튼을 보게 하는게 좋을 듯
  // 친구 카운팅 하기
  // 친구랑 채팅했던 기록이 있는지 확인하고 새 채팅하기 or 메세지 줌 인 이런식으로 만들어보기
  return (
    <div className="friend-box background-box-color border-radius20 box-shadow">
      <div className="search-section">
        <div className="friend-tab display-flex">
          <div className="btn">
            <button
              className={`btn-style
              ${selectedSection === 'addFriend' ? '--selected' : ''}`}
              onClick={() => handleSectionClick('addFriend')}
            >
              <FontAwesomeIcon icon={faUserPlus} /> Add New Friend
            </button>
          </div>
          <div className="btn">
            <button
              className={`btn-style
              ${selectedSection === 'myFriends' ? '--selected' : ''}`}
              onClick={() => handleSectionClick('myFriends')}
            >
              <FontAwesomeIcon icon={faUsers} /> My Friend
            </button>
          </div>
        </div>
        {selectedSection === 'myFriends' &&
          <>
            <div className="search-bar border-radius20">
              <form>
                <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input
                  type="text" name="name" className="border-radius15"
                // onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </form>
            </div>
          </>
        }

        {selectedSection === 'addFriend' &&
          <>
            <div className="search-bar border-radius20">
              <form>
                <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input
                  type="text" name="name" className="border-radius15"
                // onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </form>
            </div>
          </>
        }
      </div>
      {selectedSection === 'myFriends' &&
        <FriendList handleButtonClick={props.handleButtonClick} />
      }
      {selectedSection === 'addFriend' &&
        <FriendList handleButtonClick={props.handleButtonClick} />
      }
    </div>
  );
}