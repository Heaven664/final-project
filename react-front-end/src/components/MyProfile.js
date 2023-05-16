import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MyProfile.scss';

export default function MyProfile(props) {
  const handleButtonClick = () => {
    props.handlePageClick('friends');
  };

  const [state, setState] = useState({
    id: 1,
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    birthday: "",
    photo: "",
    about: ""
  });

  // get the user data from api
  useEffect(() => {
    axios.get(`/api/users/${state.id}`)
    .then((res) => {
      const user = res.data;
      // birthday formatting: leave only YYYY-MM-DD
      if (user.birthday) {
        user.birthday = user.birthday.substring(0, 10); 
      }
      setState(user);
    })
    .catch(err => {
      console.error("connect error:", err.message);
    })
  }, []);

  return (
    <div className="my-profile">
      <div className="display-flex">
        <div className="user-photo">
          <img src={state.photo} alt="user profile" className="border-radius20 box-shadow"></img>
          <div className="btn">
            <button onClick={handleButtonClick} className="background-point-color btn-style">Add Friend</button>
          </div>
        </div>
        <div className="box-shadow border-radius20 background-box-color user-detail">
          <table>
            <tr>
              <th>Name</th>
              <td>{state.first_name} {state.last_name}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{state.country}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{state.city}</td>
            </tr>
            <tr>
              <th>Birthday</th>
              <td>{state.birthday}</td>
            </tr>
            <tr>
              <th>About me</th>
              <td>{state.about}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  );
}