// Gets friend's id's of a user with provided id
export const getFriendsIds = (friendlists, id) => {
  // Filter friendlists to get needed objects
  const friendObjects = friendlists.filter(
    (friendlist) => friendlist.user_id === id
  );

  // Get ids from the objects
  return friendObjects.map((friend) => friend.friend_id);
};

// Gets table id's of a user with provided id
export const getTableIds = (friendlists, id) => {
  // Filter friendlists to get needed objects
  const friendObjects = friendlists.filter(
    (friendlist) => friendlist.user_id === id
  );

  // Get ids from the objects
  return friendObjects.map((friend) => friend.id);
};

// Gets user objects with ids from friends id array
export const getFriendsObjects = (users, friends) => {
  return users.filter((user) => friends.includes(user.id));
};

export const findFriendlist = (friendlists, userId, friendId) => {
  const friendListObject = friendlists.find(friendlist => {
    return friendlist.user_id === userId && friendlist.friend_id === friendId;
  });
  return friendListObject.id;
};
