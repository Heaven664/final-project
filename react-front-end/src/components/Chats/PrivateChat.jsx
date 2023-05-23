import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  getFriendsIds,
  getFriendsObjects,
  getFriendsMessages,
} from "helpers/friends-data";

import PrivateChatList from "components/Chats/PrivateChatList";
import MessageList from "components/Chats/MessageList";
import { friendContext } from "providers/FriendProvider";
import { Link } from "react-router-dom";

import "./PrivateChat.scss";

export default function PrivateChat(props) {
  const { friendId, openProfile } = useContext(friendContext);

  const [state, setState] = useState({
    user_id: props.user || 1,
    chats: [],
    messages: [],
    friend_id: friendId || 0,
    friend: {},
    newMessagesCounter: 0,
  });

  const socketRef = useRef(null);
  const socket = socketRef.current;

  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      sender_id: state.user_id,
      receiver_id: state.friend_id,
      text: message,
    };
    axios
      .post("/api/pmsg/", data)
      .then(() => {
        socket.emit("private message", state.friend_id);
        setState((prev) => ({
          ...prev,
          newMessagesCounter: prev.newMessagesCounter + 1,
        }));
      })
      .catch((err) => console.log(err));
    setMessage("");
  };

  const changeFriend = (friend_id) => {
    setState((prev) => ({ ...prev, friend_id }));
  };

  useEffect(() => {
    socketRef.current = io();

    const client = socketRef.current;
    client.on("connect", () => {
      console.log(`connected to server ${client.id}`);
      client.emit("send_id", state.user_id);
    });

    client.on("private message", () => {
      setState((prev) => ({
        ...prev,
        newMessagesCounter: prev.newMessagesCounter + 1,
      }));
    });

    client.on("disconnect", () => {
      console.log("disconnected from server");
    });
    return () => {
      client.disconnect();
    };
  }, []);

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
  }, [state.friend_id, state.newMessagesCounter]);

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const users = res.data;
      const friend = users.find((user) => user.id === state.friend_id);
      setState((prev) => ({ ...prev, friend }));
    });
  }, [state.friend_id]);

  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${state.friend?.photo}`;

  return (
    <div className="private-chat-component background-box-color box-shadow border-radius20">
      <div className="private-chats-list-container">
        <PrivateChatList
          friends={state.chats}
          friend={state.friend_id}
          changeFriend={changeFriend}
        />
      </div>

      <div className="private-chats-chatroom border-radius20">
        {state.friend_id !== 0 && (
          <div>
            <div className="private-chats-chatroom-title background-fundraiser-color">
              <div className="private-chats-chatroom-title-image-container ">
                {state.friend?.photo && (
                  <Link to='/profile'>
                  <div
                    className="thumbnail"
                    style={{
                      backgroundImage: `url(${pathToProfileThumbnail})`,
                    }}
                    onClick={() => openProfile(state.friend_id)}
                  ></div></Link>
                )}
              </div>
              <p className="font20">
                {state.friend && state.friend.first_name}{" "}
                {state.friend && state.friend.last_name}
              </p>
            </div>
            <div className="chatroom-messages-container">
              <MessageList
                user_id={state.user_id}
                messages={state.messages}
              ></MessageList>
            </div>
            <form
              className="chatroom-massage-input-container background-fundraiser-color"
              onSubmit={sendMessage}
            >
              <input
                type="text"
                className="chatroom-massage-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="chatroom-massage-send-button ">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
