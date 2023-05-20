import React from "react";

import "components/Chats/PrivateChatListItem.scss";

export default function PrivateChatListItem(props) {
  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${props.photo}`;
  const altName = `friend-photo${props.name}`;
  return (
    <li>
      <div
        className={`chatroom-chats-item-container border-radius15 ${
          props.user_id === props.selected ? "--selected" : ""
        }`}
        onClick={() => props.changeFriend(props.user_id)}
      >
        <div className="chatroom-chats-image-container">
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${pathToProfileThumbnail})` }}
          ></div>
        </div>
        {props.name}
      </div>
    </li>
  );
}
