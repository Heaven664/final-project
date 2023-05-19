import React, { useState, useEffect } from "react";
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
      .put(`api/users/${props.userId}/update-photo`, formData)
      .then((res) => console.log(res.data))
      .then(() => props.reload())
  };

  return (
    <form id="change-photo-container" className="btn" onSubmit={handleUpload}>
      <input
        type="file"
        className={"background-point-color btn-style change-photo"}
        onChange={handleFileChange}
      ></input>
      <button
        className={
          "background-point-color btn-style save-photo background-primary-color"
        }
      >
        Save
      </button>
    </form>
  );
}
