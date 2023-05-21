import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { friendContext } from 'providers/FriendProvider';

export default function NavThumbnail(props) {

  const { changePage } = useContext(friendContext);

  const handlePageClick = () => {
    props.handlePageClick('setting');
  };

  const [state, setState] = useState({
    id: props.user,
    photo: ""
  });
  const {userUpdated} = props;

  useEffect(() => {
    if (props.user) {
      axios.get(`/api/users/${props.user}`)
      .then((res) => {
        const user = res.data;
        setState(user);
      })
      .catch(err => {
        console.error("connect error:", err.message);
      });
  }, [userUpdated]);
  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${state.photo}`;

  return (
    <>
      {!props.user &&
        <div className="display-flex user-profile-pic">
          <p>Hi, there!</p>
          <div
            className="thumbnail background-box-color">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      }
      {props.user &&
        <div onClick={() => changePage('setting')} className="display-flex user-profile-pic">
          <p>Happy day<br /><span>{state.first_name}</span>!</p>
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${state.photo && pathToProfileThumbnail})` }}>
          </div>
        </div>
      }
    </>
  );
}
