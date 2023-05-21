import React, { useContext } from "react";

import { friendContext } from 'providers/FriendProvider';

import './FriendList.scss';


export default function ListAllUserItem(props) {

  // 1. In your ListAllUserItem, you need to have both users, and friends array. 
  // 2. You loop through all users, and check if this user also exist in friends array. If yes, then he is a friend, you show "Chat/Unfriend". If not, then he is not my friend, you show "Add" 
  // 3. You "Add" button, should push this user into friends array. So when you click add, the user become your friend, the button change 
  // 4. Your "Unfriend" button, will remove this user from "friends" array. So once you click, it is no longer your friends 


  const { allUser, searchResults, onAddFriend, onUnfriend } = props;
  const { textFriendWithId, openProfile } = useContext(friendContext);

  // searhcing...
  const usersToDisplay = searchResults.length > 0 ? searchResults : allUser.user_not_friend;

  // add friend
  const handleAddfriendClick = (user) => {
    console.log(user.id);
    onAddFriend(user);
  };

  // delete friend
  const handleUnfriendClick = (user) => {
    onUnfriend(user);
  };

  const onMessage = (id) => {
    textFriendWithId(id);
  };

  const handleMessageClick = (id) => {
    onMessage(id);
  };

  return (
    <>
      {usersToDisplay.map((user) => (
        <div className="user-list border-radius20 display-flex" key={user.id}>
          <div className="friend-user display-flex">
            <div className="thumbnail" style={{ backgroundImage: `url(${`http://localhost:8080/thumbs/${user.photo}`})` }} onClick={() => openProfile(user.id)}></div>
            <p className="font20 font-title-color">{user.name}</p>
          </div>
          <div className="btns display-flex">
            {!user.table_id &&
              <>
                <div className="btn" >
                  <button
                    className='background-point-color btn-style'
                    onClick={() => handleAddfriendClick(user)}
                  >
                    Add
                  </button>
                </div>
              </>
            }
            {user.table_id &&
              <>
                <div className="btn">
                  <button
                    className='background-primary-color btn-style'
                    onClick={() => handleMessageClick(user.id)}
                  >
                    Chat
                  </button>
                </div>
                <div className="btn">
                  <button
                    className='background-bad-color btn-style'
                    onClick={() => handleUnfriendClick(user)}
                  >
                    Unfriend
                  </button>
                </div>
              </>
            }
          </div>
        </div>
      ))}
    </>
  );
}      