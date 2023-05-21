import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import GroupChatList from "components/Chats/GroupChatList";
import MessageList from "components/Chats/MessageList";

import "./PrivateChat.scss";

// Gets friend's id's of a user with provided id
const getEventsId = (eventsList, id) => {
  // Filter friendlists to get needed objects
  const eventObjectId = eventsList.filter((event) => event.user_id === id);
  // Get ids from the objects
  return eventObjectId.map((event) => event.event_id);
};

// Gets user objects with ids from friends id array
const getEventsObject = (events, userEvents, users) => {
  const primaryEvents = events.filter((event) => userEvents.includes(event.id));
  return primaryEvents.map((event) => {
    return users
      .filter((user) => user.id === event.host_id)
      .map((user) => ({ ...event, photo: user.photo }));
  });
};

export default function GroupChat(props) {
  const [state, setState] = useState({
    user_id: props.user.id || 1,
    events: [],
    messages: [],
    event_id: 0,
    event: {},
    newMessagesCounter: 0,
    users: [],
  });

  const socketRef = useRef(null);
  const socket = socketRef.current;

  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      sender_id: state.user_id,
      event_id: state.event_id,
      text: message,
    };
    axios
      .post("/api/gmsg/", data)
      .then(() => {
        socket.emit("group message", state.event_id);
        console.log(state.event_id);
        setState((prev) => ({
          ...prev,
          newMessagesCounter: prev.newMessagesCounter + 1,
        }));
      })
      .catch((err) => console.log(err));
    setMessage("");
  };

  const changeEvent = (event_id) => {
    setState((prev) => ({ ...prev, event_id }));
  };

  // Gets the conversation between users
  const getEventMessages = (messages, event_id) => {
    const filteredMessages = messages.filter((message) => {
      return message.event_id === event_id;
    });

    return filteredMessages.map((message) => {
      const sender = state.users.find((user) => {
        return user.id === message.sender_id;
      });
      return { ...message, sender };
    });
  };

  useEffect(() => {
    socketRef.current = io();
    const client = socketRef.current;

    client.on("connect", () => {
      console.log(`connected to server ${client.id}`);
    });

    client.on("group message", () => {
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
    socketRef.current.emit("join room", state.event_id);
  }, [state.event_id]);

  useEffect(() => {
    Promise.all([
      axios.get("/api/events"),
      axios.get("api/event-user"),
      axios.get("api/users"),
    ]).then((all) => {
      const eventsId = getEventsId(all[1].data, state.user_id);
      const users = all[2].data;
      const events = getEventsObject(all[0].data, eventsId, users);
      setState((prev) => ({
        ...prev,
        events,
        users,
      }));
    });
  }, [state.user_id]);

  useEffect(() => {
    axios.get("/api/gmsg").then((res) => {
      const messages = getEventMessages(res.data, state.event_id);
      setState((prev) => ({ ...prev, messages }));
    });
  }, [state.event_id, state.newMessagesCounter]);

  useEffect(() => {
    axios.get("/api/events").then((res) => {
      const events = res.data;
      const event = events.find((event) => event.id === state.event_id);
      setState((prev) => ({ ...prev, event }));
    });
  }, [state.event_id]);

  return (
    <div className="private-chat-component background-box-color box-shadow border-radius20">
      <div className="private-chats-list-container">
        <GroupChatList events={state.events} event={state.event_id} changeEvent={changeEvent} />
      </div>

      <div className="private-chats-chatroom border-radius20">
        {state.event_id !== 0 && (
          <div>
            <div className="private-chats-chatroom-title background-fundraiser-color">
              <div className="private-chats-chatroom-title-name-container">
                <p>{state.event && state.event.name} </p>
              </div>
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
