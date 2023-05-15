import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MyProfile.scss';

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
// const userId = req.session.id;

// birthday formatter
const dateString = user.birthday;
const formattedDate = dateString.split("T")[0];

export default function MyProfile(props) {
  const handleButtonClick = () => {
    props.handlePageClick('friends');
  };

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

  // get the user data from api
  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`/api/users`)
  //   ]).then((all) => {
  //     console.log("connect");
  //     console.log(all);
  //     setState(prev => ({
  //       ...prev,
  //       first_name: all[1].data,
  //       last_name: all[2].data,
  //       country: all[5].data,
  //       city: all[6].data,
  //       birthday: all[7].data,
  //       photo: all[8].data,
  //       about: all[9].data
  //     }));
  //   })
  //   .catch(err => {
  //     console.error("connect error:", err.message);
  //   })
  // }, []);

  return (
    <div className="setting">
      

    </div>
  );
}