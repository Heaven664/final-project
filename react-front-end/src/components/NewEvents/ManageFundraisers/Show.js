import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";


export default function ShowFundraiser(props) {

  const {donation} = props;

  const percentage = donation.current_amount / donation.target_amount;

  const barPercentage = Math.round(percentage * 100) + "%";

  console.log('perc',percentage)

  const getProgress = (value) => {
    if (value > 0.75) {
      return "#9FE2BF";
    }
    if (value > 0.50) {
      return "#40E0D0";
    }
    if (value > 0.25) {
      return "#6495ED";
    }
    return "#FFBF00";
  };

  const barVariant = getProgress(percentage);
  console.log('perc',`${barVariant}`);

  return (
    <main className="--status">
      <div className='fundraisers-info'>

        <span className='wish'>Wish: {donation.title}</span>
        <span className='target'>Target: ${donation.target_amount}</span>

      </div>
      <div id='fundraisers-bar'>
        <div id="progress" style={{ width: barPercentage, "background-color": barVariant }}> {barPercentage}
        </div>
      </div>

      <button onClick={""} id="supportButton" className="background-fundraiser-color btn-style">
      <FontAwesomeIcon icon={faPenToSquare} /> Edit </button>

      <button onClick={""} id="supportButton" className="background-fundraiser-color btn-style">
      <FontAwesomeIcon icon={faTrashCan} /> Delete </button>

    </main>
  );
}