import React from "react";

import "components/Chats/PrivateChatListItem.scss";

export default function PrivateChatListItem(props) {
  const altName = `friend-photo${props.name}`
  return (
    <li>
      <div className={`chatroom-chats-item-container border-radius15 ${props.user_id === props.selected ? '--selected' : ''}`} onClick={() => props.changeFriend(props.user_id)}>
        <div className="chatroom-chats-image-container">
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${props.photo})` }}>
          </div>
        </div>
        {props.name}
      </div>
    </li>
  );
}