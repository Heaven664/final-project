import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import './MyProfile.scss';

import { friendContext } from "providers/FriendProvider";
import ProfileButton from "components/Buttons/ProfileButton"

export default function MyProfile(props) {

  const { changePage } = useContext(friendContext);

  const storedUser = sessionStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser).id : 0;

  const [state, setState] = useState({
    id: props.userId || currentUser,
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
      });
  }, []);

  return (
    <div className="my-profile">
      <div className="display-flex">
        <div className="user-photo">
          <img src={state.photo} alt="user profile" className="border-radius20 box-shadow"></img>
          <ProfileButton>Add Friend</ProfileButton>
        </div>
        <div className="box-shadow border-radius20 background-box-color user-detail">
          <table>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}