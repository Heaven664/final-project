import React from "react";

import PrivateChatListItem from "components/PrivateChatListItem";

import "components/PrivateChatList.scss";

export default function PrivateChatList(props) {
  const chats = props.friends.map((chat) => {
    return (
      <PrivateChatListItem
        key={chat.id}
        user_id={chat.id}
        name={chat.first_name}
        photo={chat.photo}
      ></PrivateChatListItem>
    );
  });

  return <ul className="chatroom-chats-list">{chats}</ul>;
}
