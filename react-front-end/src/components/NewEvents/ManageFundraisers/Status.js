import React from "react";
import "./styles.scss";


export default function StatusFundraiser(props) {

  return (
    <main className="--status">

      <h1 className="font24">{props.message}</h1>
    </main>
  );
}