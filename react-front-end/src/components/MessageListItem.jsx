import React from 'react';
import classNames from "classnames";

import 'components/MessageListItem.scss'

export default function MessageListItem(props) {

  let messageClass = classNames("message-container", {
    "my-message": props.sentByUser
  })

  return <li>
    <div className={messageClass}>
      <p>{props.text}</p>
    </div>
  </li>
}