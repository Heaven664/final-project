import React from "react";

import "components/PrivateChatListItem.scss";

export default function PrivateChatListItem(props) {
  return (
    <li>
      <div className="chatroom-chats-item-container">
        <div className="chatroom-chats-image-container">
          <img
            className="chatroom-chats-image"
            // src={props.photo}
            alt="friend-photo"
          />
        </div>
        {props.name}
      </div>
    </li>
  );
}
