import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Setting.scss';

const user = {
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password_digest": "password123",
  "country": "United States",
  "city": "New York",
  "birthday": "1990-01-01T08:00:00.000Z",
  "photo": "http://localhost:8080/images/user-image-1.jpg",
  "about": "Hi, guys. My name is Jane and I am a graphical designer. Outside of work, I enjoy exploring the great outdoors through hiking and biking. "
}

// birthday formatter
const dateString = user.birthday;
const formattedDate = dateString.split("T")[0];

export default function MyProfile(props) {

  const [state, setState] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    country: user.country,
    city: user.city,
    birthday: formattedDate,
    photo: user.photo,
    about: user.about
  });


  const updateProfile = (e) => {
    e.preventDefault()
    const data = {
      first_name: state.first_name,
      last_name: state.last_name,
      country: state.country,
      city: state.city,
      birthday: state.birthday,
      about: state.about
    }
    console.log("updated: ", data);
    axios.post(`/api/users/${state.id}/edit`, data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  };

  // useEffect(() => {
  //   axios.get(`/api/users/${state.id}`)
  //   .then((res) => {
  //     const user1 = res.data;
  //     setState((prev) => ({ ...prev, user1 }));
  //   });
  // }, []);

  return (
    <div className="settingBox background-box-color border-radius20 box-shadow">
      <form onSubmit={updateProfile}>
        <table>
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