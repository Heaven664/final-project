import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Fundraisers.scss"

export default function Fundraisers(props) {

  const percentage = props.donation.current_amount / props.donation.target_amount;
  const barPercentage = percentage * 100 + "%";

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
        <span className='name'>Wish: {props.donation.name}</span>
        <span className='name'>Target: ${props.donation.target_amount}</span>
      </div>

      <div id='fundraisers-bar'>
        <div id="myBar" style={{width : barPercentage, 
          "background-color": barVariant}}>{barPercentage}</div>
      </div>

      <div className='fundraisers-interact'>
        <button onClick={""} 
        className="background-point-color btn-style">Support!</button>
      </div>
    </main>
  )
}


