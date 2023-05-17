import React from 'react';
import classNames from "classnames";

import 'components/MessageListItem.scss'

export default function MessageListItem(props) {

  let messageClass = classNames("message-container", {
    "my-message": props.sentByUser,
    "sender-name": props.sender
  })

  return <li>
    <div className={messageClass}>
      {(props.sender && !props.sentByUser) && <p className="group-chat-user-name">{props.sender.first_name} {props.sender.last_name}</p>}
      <p>{props.text}</p>
    </div>
  </li>
}