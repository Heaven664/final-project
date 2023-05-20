import React from "react";

import "components/Chats/PrivateChatListItem.scss";



export default function GroupChatListItem(props) {
  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${props.photo}`;
  const altName = `friend-photo${props.name}`
  return (
    <li>
      <div className={`chatroom-chats-item-container border-radius15 ${props.event_id === props.selected ? '--selected' : ''}`} onClick={() => props.changeEvent(props.user_id)}>
        <div className="chatroom-chats-image-container">
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}>
          </div>
        </div>
        {props.name}
      </div>
    </li>
  );
}
