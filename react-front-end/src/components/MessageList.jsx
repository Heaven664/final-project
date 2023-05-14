import React from 'react';
import MessageListItem from 'components/MessageListItem'

import "components/MessageList.scss"

export default function MassageList(props) {

  const messages = props.messages.map(message => {
    const user_id = 1;
    return(
      <MessageListItem
      key={message.id}
      sender_id={message.sender_id}
      text={message.text}
      sentByUser={message.sender_id === user_id}
      ></MessageListItem>
    )
  })

  return(
    <ul className="chatroom-messages-list">{messages}</ul>
  )
}