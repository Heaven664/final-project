import React, { useState } from "react";
import "./ChangePhoto.scss";
import axios from "axios";

export default function ProfileButton() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    // console.log(selectedImage)
    // console.log(formData);
    axios.post("api/update-photo").then((res) => console.log(res.data));
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
