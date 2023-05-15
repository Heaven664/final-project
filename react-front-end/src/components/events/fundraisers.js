import React from 'react';
import { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import "./fundraisers.scss"
// import MenuList from "components/MenuList.js";

export default function Fundraisers(props) {


  const percentage = props.donation.current / props.donation.target;
  const getProgress = function (value) {
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
  }




  console.log(props.props);
  return (
    <main className="fundraisers-layout">

      <div className='fundraisers-info'>
        <span className='name'>Wish: {props.donation.name}</span>
        <span className='name'>Target: ${props.donation.target}</span>
      </div>

      <div className='fundraisers-bar'>
      <ProgressBar 
        animated 
        variant={getProgress(percentage)}
        now={percentage} 
      />;
      </div>

      <div className='fundraisers-interact'>
      <Button variant="primary">Support!</Button>{' '}
      </div>
    </main>
  )
}


