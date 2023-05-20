import React, { useState } from "react";
import "./ChangePhoto.scss";
import axios from "axios";

export default function ProfileButton(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    axios
      .patch(`api/users/${props.userId}/update-photo`, formData)
      .then((res) => console.log(res.data))
      .then(() => props.reload())
      .catch(res => console.log(res.message))
  };

  return (
    <form id="change-photo-container" className="btn display-flex" onSubmit={handleUpload}>
      <label htmlFor="change-photo" className="change-photo background-fundraiser-color btn-style display-flex">
        <span>Upload New Photo</span>
        <input
          type="file"
          id="change-photo"
          onChange={handleFileChange}
        ></input>
      </label>
      <button
        className="background-point-color btn-style save-photo background-primary-color"
      >
        Save
      </button>
    </form>
  );
}
