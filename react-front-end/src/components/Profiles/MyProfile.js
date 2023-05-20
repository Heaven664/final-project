import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import './MyProfile.scss';

import { friendContext } from "providers/FriendProvider";
import ProfileButton from "components/Buttons/ProfileButton";
import ChangePhoto from "components/Buttons/ChangePhoto";
import { getFriendsIds } from 'helpers/friends-data';

export default function MyProfile(props) {

  const { profileID } = useContext(friendContext);

  const [reloadFlag, setReloadFlag] = useState(null);

  const reload = () => {
    setReloadFlag(prevFlag => !prevFlag);
  };

  const storedUser = sessionStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser).id : 0;


  const [state, setState] = useState({
    id: profileID || currentUser,
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    birthday: "",
    photo: "",
    about: "",
    isFriend: false,
  });

  const apiUser = profileID || currentUser;

  // When user presses on "My profile get his profile data"
  useEffect(() => {
    axios.get(`/api/users/${apiUser}`)
      .then((res) => {
        const user = res.data;
        // birthday formatting: leave only YYYY-MM-DD
        if (user.birthday) {
          user.birthday = user.birthday.substring(0, 10);
        }
        setState(prev => ({ ...prev, ...user }));
      })
      .catch(err => {
        console.error("connect error:", err.message);
      });
  }, [reloadFlag, props.reload]);

  useEffect(() => {
    Promise.all([axios.get("/api/users"), axios.get("api/friendlists")])
      .then(
        (all) => {
          const friendIds = getFriendsIds(all[1].data, currentUser);
          const isFriend = friendIds.includes(state.id);
          setState(prev => ({ ...prev, isFriend }));
        }
      );
  }, [props.reload]);

  return (
    <div className="my-profile">
      <div className="display-flex">
        <div className="user-photo">
          <img src={state.photo} alt="user profile" className="border-radius20 box-shadow"></img>
          {state.id === currentUser && <ChangePhoto userId={currentUser} reload={reload} />}
          {(state.id !== currentUser) && state.isFriend && <ProfileButton>Message</ProfileButton>}
          {(state.id !== currentUser && !state.isFriend) && <ProfileButton>Add Friend</ProfileButton>}
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