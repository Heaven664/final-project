import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";


export default function ShowFundraiser(props) {

  const {donation} = props;

  console.log('donation', donation);

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

      <main className="fundraisers-layout">

<div className='fundraisers-info'>
  <span className='wish'>Wish: {props.donation.title}</span>
  <span className='target'>Target: ${props.donation.target_amount}</span>
</div>
  <div id='fundraisers-bar'>
    <div id="progress" style={{ width: barPercentage, "background-color": barVariant }}> {barPercentage}
    </div>
  </div>
    <button onClick={""} id="supportButton" className="background-fundraiser-color btn-style">
    <FontAwesomeIcon icon={faCircleDollarToSlot} />
       Support! </button>

    </main>
  );
}