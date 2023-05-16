import React from "react";

import GroupChatListItem from "components/GroupChatListItem";

import "components/PrivateChatList.scss";

export default function GroupChatList(props) {
  const events = props.events.map((event) => {
    return (
      <GroupChatListItem
        key={event[0].id}
        user_id={event[0].id}
        name={event[0].name}
        agenda={event[0].agenda}
        photo={event[0].photo}
        changeEvent={props.changeEvent}
      ></GroupChatListItem>
    );
  });

  return <ul className="chatroom-chats-list">{events}</ul>;
}
