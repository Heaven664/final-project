import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";


export default function ShowFundraiser(props) {

  const { donation } = props;

  console.log('donation', donation);

  const percentage = donation.current_amount / donation.target_amount;

  const barPercentage = Math.round(percentage * 100) + "%";

  console.log('perc', percentage)

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
  console.log('perc', `${barVariant}`);

  return (
    <main className="--status">
      <div className='fundraisers-info'>
        <p className='wish'>Wish: <span>{donation.title}</span></p>
        <p className='target'>Target: <span>${donation.target_amount}</span></p>
      </div>

      <div id='fundraisers-bar'>
        <div id="progress" style={{ width: barPercentage, "background-color": barVariant }}> {barPercentage}
        </div>
      </div>

      <div id='status-button'>
        <button onClick={props.onEdit} className="background-add-color btn-style">
          <FontAwesomeIcon icon={faPenToSquare} />Edit </button>

        <button onClick={props.onDelete} className="background-bad-color btn-style">
          <FontAwesomeIcon icon={faTrashCan} />Delete </button>
      </div>
    </main>
  );
}