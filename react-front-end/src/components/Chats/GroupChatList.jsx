import React from "react";
// import { Link } from "react-router-dom";

import GroupChatListItem from "components/Chats/GroupChatListItem";

import "./PrivateChatList.scss";

export default function GroupChatList(props) {
  const events = props.events.map((event) => {
    return (
      // <Link to={`${event[0].id}`}>
      <GroupChatListItem
        key={event[0].id}
        event_id={event[0].id}
        user_id={event[0].id}
        name={event[0].name}
        photo={event[0].photo}
        changeEvent={props.changeEvent}
        selected={props.event}
      ></GroupChatListItem>
      // </Link>
    );
  });

  return <ul className="chatroom-chats-list">{events}</ul>;
}
