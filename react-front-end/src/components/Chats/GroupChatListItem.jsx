import React from "react";

import "components/Chats/PrivateChatListItem.scss";

export default function GroupChatListItem(props) {
  console.log("GROUP ", props);
  const altName = `friend-photo${props.name}`
  return (
    <li>
      <div className={`chatroom-chats-item-container border-radius15 ${props.event_id === props.selected ? '--selected' : ''}`} onClick={() => props.changeEvent(props.user_id)}>
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
