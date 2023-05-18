import React from 'react';
import MessageListItem from 'components/Chats/MessageListItem'

import "components/Chats/MessageList.scss"

export default function MassageList(props) {

  const messages = props.messages.map(message => {
    return(
      <MessageListItem
      key={message.id}
      sender={message.sender}
      sender_id={message.sender_id}
      text={message.text}
      sentByUser={message.sender_id === props.user_id}
      ></MessageListItem>
    )
  })

  return(
    <ul className="chatroom-messages-list">{messages}</ul>
  )
}