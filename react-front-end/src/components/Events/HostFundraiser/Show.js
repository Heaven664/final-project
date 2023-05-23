import React, { useState } from 'react';
import "../HostFundraiser/styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, faPenToSquare, faIcons } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Fundraisers from '../Fundraisers';
import dateFormat from 'dateformat';


export default function ShowHostFundraiser(props) {

  const { donation, onCollect, onModify, mature, collected, collected_date } = props;

  console.log('donation', donation);

  const percentage = donation.current_amount / donation.target_amount;

  const barPercentage = Math.round(percentage * 100) + "%";

  console.log('perc', percentage);

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

  const eventDate = dateFormat(collected_date, "dddd, mmmm dS, yyyy hh:mm:ss");

  return (

    <main className="fundraisers-layout">

      <div className='fundraisers-info'>
        <p className='wish font20'>Wish:<br />{props.donation.title}</p>
        <p className='target font16'>Target: ${props.donation.target_amount}</p>
      </div>
      <div id='fundraisers-bar'>
        <div id="progress" style={{ width: barPercentage, "background-color": barVariant }}> {barPercentage}
        </div>
      </div>

      {
        mature
          ?
          <>
            {
              collected
                ?
                <>
                  <span className='collect-alert'>Collected on {eventDate}!</span>
                  <Link to={`/memories/${donation.id}`} className="supportButton">
                    <button onClick={onCollect}  className="background-fundraiser-color btn-style ">
                  <FontAwesomeIcon icon={faIcons} /> <br />
                  Memories </button>
                  </Link>

                </>
                :
                <button onClick={onCollect}  className="background-fundraiser-color btn-style supportButton">
                  <FontAwesomeIcon icon={faSackDollar} /> <br />
                  Collect </button>

            }
          </>
          :
          <>
            <span className='collect-alert'>Wait until event date to collect!</span>
            <button onClick={onModify} className="background-fundraiser-color btn-style supportButton">
              <FontAwesomeIcon icon={faPenToSquare} /> <br />
              Modify</button>
          </>
      }
    </main>
  );
}