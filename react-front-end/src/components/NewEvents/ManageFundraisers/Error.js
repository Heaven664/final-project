import React from "react";
import "components/Appointment/styles.scss";


export default function Error(props) {

  return (
    <main className="--error">
      <section className="__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}