import React, { useState, useEffect } from "react";
import axios from 'axios';
import './NewEvents.scss';

export default function Setting(props) {


  const [state, setState] = useState({
    name:"", description:"", agenda:"", event_date:"", event_location:"", host_id:""
  });

  const updateEvent = (e) => {
    e.preventDefault()
    const data = {
      name:"", description:"", agenda:"", event_date:"", event_location:"", host_id:""
    }
    console.log("updated: ", data);
    axios.patch(`/api/users/${state.id}/edit`, data)
      .then(res => {
        console.log(res.data);
        props.handlePageClick('profile');
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    axios.get(`/api/users/${state.id}`)
      .then((res) => {
        const user = res.data;
        if (user.birthday) {
          user.birthday = user.birthday.substring(0, 10);
        }
        setState(user);
      });
  }, []);


  return (
    <div className="settingBox background-box-color border-radius20 box-shadow">
      <form onSubmit={updateProfile}>
        <table>
          <tbody>
            <tr>
              <th className="font-title font24">Name</th>
              <td>
                <input
                  className="nameField"
                  type="text"
                  name="first_name"
                  value={state.first_name}
                  onChange={(e) => setState({ ...state, first_name: e.target.value })}
                />
                <input
                  className="nameField"
                  type="text"
                  name="last_name"
                  value={state.last_name}
                  onChange={(e) => setState({ ...state, last_name: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <th className="font-title font24">Birthday</th>
              <td>
                <input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => setState({ ...state, birthday: e.target.value })}
                  name="birthday"
                  value={state.birthday}
                />
              </td>
            </tr>
            <tr>
              <th className="font-title font24">Country</th>
              <td>
                <input
                  type="text"
                  name="country"
                  value={state.country}
                  onChange={(e) => setState({ ...state, country: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <th className="font-title font24">City</th>
              <td>
                <input
                  type="text"
                  name="city"
                  value={state.city}
                  onChange={(e) => setState({ ...state, city: e.target.value })}
                />
              </td>
            </tr>
            <tr className="font-title font24">
              <th>About me</th>
              <td>
                <textarea
                  className="aboutField"
                  name="about"
                  value={state.about}
                  onChange={(e) => setState({ ...state, about: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn">
          <button className="background-primary-color btn-style">
            Save Change
          </button>
        </div>
      </form>

    </div>
  );
}