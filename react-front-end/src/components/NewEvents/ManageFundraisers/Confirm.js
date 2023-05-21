import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";


export default function ConfirmFundraiser(props) {

  return (
    <main className="--status">
      <h3 className="font16">{props.message}</h3>
      <button onClick={props.onCancel} id="supportButton" className="background-fundraiser-color btn-style">
        <FontAwesomeIcon icon={faRectangleXmark} />Cancel </button>

      <button onClick={props.onConfirm} id="supportButton" className="background-bad-color btn-style">
        <FontAwesomeIcon icon={faSquareCheck} />Confirm </button>
    </main>
  );
}