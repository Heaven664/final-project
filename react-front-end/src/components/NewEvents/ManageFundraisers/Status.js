import React from "react";
import "./styles.scss";


export default function Status(props) {

  return (
    <main className="--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="">{props.message}</h1>
    </main>
  );
}