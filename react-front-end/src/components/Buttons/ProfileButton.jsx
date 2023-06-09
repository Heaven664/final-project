import React from "react";

export default function ProfileButton(props) {
  return (
    <div className="btn">
      <button className="background-point-color btn-style Message" onClick={props.interaction}>
        {props.children}
      </button>
    </div>
  );
}
