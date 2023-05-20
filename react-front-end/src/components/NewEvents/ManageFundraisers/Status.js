import React from "react";
import "./styles.scss";


export default function Status(props) {

  return (
    <main className="--status">
      <img
        className="__status-image"
        src="images/loading.gif"
        alt="Loading"
      />
      <h1 className="font24">{props.message}</h1>
    </main>
  );
}