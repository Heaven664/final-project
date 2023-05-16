import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fundraisers.scss"

export default function Fundraisers(props) {

  const percentage = props.donation.current_amount / props.donation.target_amount;
  const barPercentage = percentage * 100;

  console.log('perc',percentage)

  const getProgress = (value) => {
    if (value > 0.75) {
      return "success";
    }
    if (value > 0.50) {
      return "info";
    }
    if (value > 0.25) {
      return "warning";
    }
    return "danger";
  };
  const barVariant = getProgress(percentage);
  console.log('perc',`${barVariant}`);


  return (
    <main className="fundraisers-layout">

      <div className='fundraisers-info'>
        <span className='name'>Wish: {props.donation.name}</span>
        <span className='name'>Target: ${props.donation.target_amount}</span>
      </div>

      <div className='fundraisers-bar'>
        
      <ProgressBar animated variant={barVariant} now={barPercentage} />
      </div>

      <div className='fundraisers-interact'>
      <Button variant="primary">Support!</Button>{' '}
      </div>
    </main>
  )
}


