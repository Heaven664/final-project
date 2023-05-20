import React from "react";
import "./styles.scss";
import { faRectangleXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";


export default function Confirm(props) {

  return (
    <main className="--status">
    <button onClick={""} id="supportButton" className="background-fundraiser-color btn-style">
    <FontAwesomeIcon icon={faRectangleXmark} /> Cancel </button>

    <button onClick={""} id="supportButton" className="background-fundraiser-color btn-style">
    <FontAwesomeIcon icon={faSquareCheck} /> Confirm </button>
    </main>
  );
}