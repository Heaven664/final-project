import React, { useContext } from "react";

import { friendContext } from 'providers/FriendProvider';

import './FriendList.scss';


export default function ListFriendItem(props) {

  const { textFriendWithId, changePage, changeProfileId } = useContext(friendContext);

  // const [friend, setFriend] = useState(false);
  const { friend, searchResults, onUnfriend } = props;

  // searhcing...
  const usersToDisplay = searchResults.length > 0 ? searchResults : friend.friend_id;

  const onMessage = (id) => {
    textFriendWithId(id);
  };

  const openFriendProfile = (id) => {
    changeProfileId(id);
    changePage('profile');
  };

  const searchResult = usersToDisplay.map(user => {
    const handleUnfriendClick = (a) => {
      // console.log("LIST ITEM DELETE: ", a);
      onUnfriend(a);
    };

    const handleMessageClick = () => {
      onMessage(user.id);
    };
    // console.log("friend.friend_id", user.id, user.table_id, user.name);

    return (
      <div
        className="user-list border-radius20 display-flex"
        key={user.table_id}
      >
        <div className="friend-user display-flex">
          <div className="thumbnail" style={{ backgroundImage: `url(${user.photo})` }} onClick={() => openFriendProfile(user.id)}></div>
          <p className="font20 font-title-color">{user.first_name} {user.last_name}</p>
        </div>
        <div className="btns display-flex">
          <div className="btn">
            <button
              className='background-primary-color btn-style'
              onClick={handleMessageClick}
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
        </div>
      </div>
    );
  });

  return (
    <>
      {searchResult}
    </>
  );
}      