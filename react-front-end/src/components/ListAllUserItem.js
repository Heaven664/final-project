import React, { useContext } from "react";

import { friendContext } from 'providers/FriendProvider';

import './FriendList.scss';


export default function ListAllUserItem(props) {
  // new state for exist friend
  // friends = [1, 2, 3] 
  // users = [1, 2, 3, 4, 5, 6] 
  // [4, 5, 6] only render
  // if currentId is exist friend list 
  // multiple state. Ready user and friend / compare it 
  // total user != friend -> 

  // 1. In your ListAllUserItem, you need to have both users, and friends array. 
  // 2. You loop through all users, and check if this user also exist in friends array. If yes, then he is a friend, you show "Chat/Unfriend". If not, then he is not my friend, you show "Add" 
  // 3. You "Add" button, should push this user into friends array. So when you click add, the user become your friend, the button change 
  // 4. Your "Unfriend" button, will remove this user from "friends" array. So once you click, it is no longer your friends 


  const { allUser, onAddFriend, onUnfriend } = props;

  // add friend
  const handleAddfriendClick = (e) => {
    onAddFriend(e);
  };

  // delete friend
  const handleUnfriendClick = (e) => {
    onUnfriend(e);
  };

  const { textFriendWithId } = useContext(friendContext);
  const onMessage = (id) => {
    textFriendWithId(id);
  };

  const handleMessageClick = (id) => {
    onMessage(id);
  };

  return (
    <>
      {allUser.user_not_friend.map((user) => (
        <div className="user-list border-radius20 display-flex" key={user.id}>
          <div className="friend-user display-flex">
            <div className="thumbnail" style={{ backgroundImage: `url(${user.photo})` }}></div>
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
  )
}      