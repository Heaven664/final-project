import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { friendContext } from 'providers/FriendProvider';

import './FriendList.scss';


export default function ListFriendItem(props) {

  const { textFriendWithId, openProfile } = useContext(friendContext);

  // const [friend, setFriend] = useState(false);
  const { friend, searchResults, onUnfriend } = props;

  // searhcing...
  const usersToDisplay = searchResults.length > 0 ? searchResults : friend.friend_id;

  const onMessage = (id) => {
    textFriendWithId(id);
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

    const pathToProfileThumbnail = `http://localhost:8080/thumbs/${user.photo}`;

    return (
      <div
        className="user-list border-radius20 display-flex"
        key={user.table_id}
      >
        <div className="friend-user display-flex">

          <Link to='/profile'>
            <div className="thumbnail" style={{ backgroundImage: `url(${pathToProfileThumbnail})` }} onClick={() => openProfile(user.id)}></div>
          </Link>
          <p className="font20 font-title-color">{user.first_name} {user.last_name}</p>
        </div>
        <div className="btns display-flex">
          <div className="btn">
            <Link to='/chat'>
              <button className='background-primary-color btn-style'
                onClick={handleMessageClick}>
                Chat
              </button>
            </Link>
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