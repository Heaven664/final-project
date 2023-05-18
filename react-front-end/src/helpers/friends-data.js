// Gets friend's id's of a user with provided id
const getFriendsIds = (friendlists, id) => {
  // Filter friendlists to get needed objects
  const friendObjects = friendlists.filter(
    (friendlist) => friendlist.user_id === id
  );
  // Get ids from the objects
  return friendObjects.map((friend) => friend.friend_id);
};

// Gets user objects with ids from friends id array
const getFriendsObjects = (users, friends) => {
  return users.filter((user) => friends.includes(user.id));
};

// Gets the conversation between users
const getFriendsMessages = (messages, user_id, friend_id) => {
  const filteredMessages = messages.filter((message) => {
    return (
      (message.sender_id === user_id && message.receiver_id === friend_id) ||
      (message.sender_id === friend_id && message.receiver_id === user_id)
    );
  });
  return filteredMessages;
};

export { getFriendsIds, getFriendsObjects, getFriendsMessages };