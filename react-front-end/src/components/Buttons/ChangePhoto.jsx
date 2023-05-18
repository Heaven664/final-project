import React, { useState } from "react";
import "./ChangePhoto.scss";

export default function ProfileButton() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = () => {
    console.log("loaded file");
    // setSelectedImage(event.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("save file");
    // const fromData = new FormData();
  };

  return (
    <form id="change-photo-container" className="btn" onSubmit={handleUpload}>
      <input type="file"
        className={"background-point-color btn-style change-photo"}
        onChange={handleFileChange}
      >
      </input>
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
