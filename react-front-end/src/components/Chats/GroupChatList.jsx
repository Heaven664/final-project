import React from "react";

import GroupChatListItem from "components/Chats/GroupChatListItem";

import "./PrivateChatList.scss";

export default function GroupChatList(props) {
  const events = props.events.map((event) => {
    return (
      <GroupChatListItem
        key={event[0].id}
        event_id={event[0].id}
        user_id={event[0].id}
        name={event[0].name}
        photo={event[0].photo}
        changeEvent={props.changeEvent}
        selected={props.event}
      ></GroupChatListItem>
    );
  });

  return <ul className="chatroom-chats-list">{events}</ul>;
}
