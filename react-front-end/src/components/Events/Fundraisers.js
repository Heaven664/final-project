import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Fundraisers.scss"

export default function Fundraisers(props) {

  const percentage = props.donation.current_amount / props.donation.target_amount;
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
    <main className="fundraisers-layout">

      <div className='fundraisers-info'>
        <span className='wish'>Wish: {props.donation.title}</span>
        <span className='target'>Target: ${props.donation.target_amount}</span>
      </div>
      <div id='fundraisers-bar'>
        <div id="progress" style={{ width: barPercentage, "background-color": barVariant }}> {barPercentage}
        </div>
      </div>
      <button onClick={""} id="supportButton" className="background-fundraiser-color btn-style">Support</button>


    </main>
  )
}


