import React from "react";

import "components/PrivateChatListItem.scss";

export default function PrivateChatListItem(props) {
  const altName = `friend-photo${props.name}`
  return (
    <li>
      <div className="chatroom-chats-item-container" onClick={() => props.changeFriend(props.user_id)}>
        <div className="chatroom-chats-image-container">
          <img
            className="chatroom-chats-image"
            // src={props.photo}
            alt={altName}
          />
        </div>
        {props.name}
      </div>
    </li>
  );
}
