import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NavThumbnail(props) {

  const handlePageClick = () => {
    props.handlePageClick('setting');
  };
  const [state, setState] = useState({
    id: props.user,
    photo: ""
  });

  useEffect(() => {
    axios.get(`/api/users/${state.id}`)
      .then((res) => {
        const user = res.data;
        setState(user);
      })
      .catch(err => {
        console.error("connect error:", err.message);
      })
  }, []);

  return (
    <>
      {!props.user &&
        <div>
          <div
            className="thumbnail background-box-color">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      }
      {props.user &&
        <div onClick={() => handlePageClick('setting')}>
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${state.photo})` }}>
          </div>
        </div>
      }
    </>
  );
}
