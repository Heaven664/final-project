import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login(props) {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/events");
    }, 3000);
  });

  return (
    <div>
      <Link to='/login'>
        <button onClick={props.login1}>Login 1</button>
        <button onClick={props.login2}>Login 2</button>
      </Link>
    </div>
  );
}