import React from "react";

import "components/PrivateChatListItem.scss";

export default function PrivateChatListItem(props) {
  const altName = `friend-photo-${props.name}`
  return (
    <li>
      <div className="chatroom-chats-item-container">
        <div className="chatroom-chats-image-container">
          <img
            className="chatroom-chats-image"
            alt={altName}
          />
        </div>
        {props.name}
      </div>
    </li>
  );
}
