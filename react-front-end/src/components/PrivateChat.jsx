import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import PrivateChatList from "components/PrivateChatList";
import MessageList from "components/MessageList";

import "./PrivateChat.scss";

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

// Gets the conversation between users
const getFriendsMessages = (messages, user_id, friend_id) => {
  const filteredMessages = messages.filter((message) => {
    return (
      (message.sender_id === user_id && message.receiver_id === friend_id) ||
      (message.sender_id === friend_id && message.receiver_id === user_id)
    );
  });
  return filteredMessages;
};

export default function PrivateChat(props) {
  const [state, setState] = useState({
    user_id: 1,
    chats: [],
    messages: [],
    friend_id: 0,
    friend: {},
  });

  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault()
    const data = {
      sender_id: state.user_id,
      receiver_id: state.friend_id,
      text: message,
    }
    axios.post('/api/pmsg/', data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    setMessage('')

  };

  const changeFriend = (friend_id) => {
    setState((prev) => ({ ...prev, friend_id }));
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
    axios.get("/api/pmsg").then((res) => {
      const messages = getFriendsMessages(
        res.data,
        state.user_id,
        state.friend_id
      );
      setState((prev) => ({ ...prev, messages }));
    });
  }, [state.friend_id]);

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const users = res.data;
      const friend = users.find((user) => user.id === state.friend_id);
      setState((prev) => ({ ...prev, friend }));
    });
  }, [state.friend_id]);

  return (
    <div className="private-chat-component">
      <div className="private-chats-list-container">
        <PrivateChatList friends={state.chats} changeFriend={changeFriend} />
      </div>

      <div className="private-chats-chatroom">
        {state.friend_id !== 0 && (
          <div>
            <div className="private-chats-chatroom-title">
              <div className="private-chats-chatroom-title-image-container">
                <img
                  src={state.friend && state.friend.photo}
                  alt={state.friend_id}
                />
              </div>
              <div className="private-chats-chatroom-title-name-container">
                <p>
                  {state.friend && state.friend.first_name}{" "}
                  {state.friend && state.friend.last_name}
                </p>
              </div>
            </div>
            <div className="chatroom-messages-container">
              <MessageList messages={state.messages}></MessageList>
            </div>
            <form
              className="chatroom-massage-input-container"
              onSubmit={sendMessage}
            >
              <input
                type="text"
                className="chatroom-massage-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="chatroom-massage-send-button">
                <FontAwesomeIcon icon={faPaperPlane} />
                <br />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
