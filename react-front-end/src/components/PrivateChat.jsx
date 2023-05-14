import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import PrivateChatList from "components/PrivateChatList";
import MessageList from "components/MessageList";

import "./PrivateChat.scss";

export default function PrivateChat(props) {
  const [state, setState] = useState({
    chats: [],
    messages: [],
  });

  useEffect(() => {
    Promise.all([axios.get("/api/users"), axios.get("/api/pmsg")]).then(
      (all) => {
        setState((prev) => ({
          ...prev,
          chats: all[0].data,
          messages: all[1].data,
        }));
      }
    );
  }, []);

  return (
    <div className="private-chat-component">
      <div className="private-chats-list-container">
        <PrivateChatList friends={state.chats} />
      </div>
      <div className="private-chats-chatroom">
        <div className="private-chats-chatroom-title">
          <div className="private-chats-chatroom-title-image-container">
            Image
          </div>
          <div className="private-chats-chatroom-title-name-container">
            Full Name
          </div>
        </div>
        <div className="chatroom-messages-container">

        </div>
        <div className="chatroom-massage-input-container">
          <input type="text" className="chatroom-massage-input" />
          <button className="chatroom-massage-send-button">
            <FontAwesomeIcon icon={faPaperPlane} />
            <br />
          </button>
        </div>
      </div>
    </div>
  );
}
