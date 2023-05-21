import React from "react";
import { Link } from "react-router-dom";

export default function Login(props) {

  return (
    <div>
      <button onClick={props.login1}>Login 1</button>
      <button onClick={props.login2}>Login 2</button>
    </div>
  )
}