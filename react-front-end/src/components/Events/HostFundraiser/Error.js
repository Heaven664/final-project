import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function ErrorHostFundraiser(props) {

  return (
    <main className="--error">
      <section className="__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
     <button onClick={props.onClose}
      className="background-point-color btn-style"> Add a Fundraiser!
      <FontAwesomeIcon className="" icon={faXmark}/>
      </button>
    </main>
  );
}