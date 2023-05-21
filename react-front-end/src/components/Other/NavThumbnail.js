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
    id: props.user?.id,
    photo: ""
  });

  useEffect(() => {
    axios.get(`/api/users/${props.user?.id}`)
      .then((res) => {
        const user = res.data;
        setState(user);
      })
      .catch(err => {
        console.error("connect error:", err.message);
      });
  }, []);
  const pathToProfileThumbnail = `http://localhost:8080/thumbs/${state.photo}`;

  return (
    <>
      {!props.user?.id &&
        <div>
          <div
            className="thumbnail background-box-color">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      }
      {props.user?.id &&
        <div onClick={() => changePage('setting')}>
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${state.photo && pathToProfileThumbnail})` }}>
          </div>
        </div>
      }
    </>
  );
}
