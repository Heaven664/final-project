import React, { Component } from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';

// css, font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faComment, faComments, faCakeCandles, faCalendarPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import "./fundraisers.scss"
// import MenuList from "components/MenuList.js";

export default function Fundraisers(props) {

  console.log(props.props);
  return (
    <main className="fundraisers-layout">

      <div className='fundraisers-info'>
        <img className='-img' src={props.hostInfo.photo} alt="event_host_avatar" width="500" height="600"/>
        <span className='name'>{props.hostInfo.first_name} {props.hostInfo.last_name}</span>
      </div>

      <div className='fundraisers-bar'>
        <img className='-img' src={props.hostInfo.photo} alt="event_host_avatar" width="500" height="600"/>
        <span className='name'>{props.hostInfo.first_name} {props.hostInfo.last_name}</span>
      </div>

      <div className='fundraisers-interact'>
        <img className='-img' src={props.hostInfo.photo} alt="event_host_avatar" width="500" height="600"/>
        <span className='name'>{props.hostInfo.first_name} {props.hostInfo.last_name}</span>
      </div>
    </main>
  )
}
