import React, { useState, useEffect } from "react";
import axios from "axios";
import './FriendList.scss';


export default function FriendListItem(props) {

  return (
    <>
    <div className="friend-user display-flex">
      <div className="thumbnail" style={{ backgroundImage: "url(http://localhost:8080/images/user-image-3.jpg)" }}></div>
      <p className="font20 font-title-color">Owen Peterson</p>
    </div>
    <div className="btns display-flex">
      <div className="btn">
        <button
          className='background-primary-color btn-style'
          onClick={() => {props.handlePageClick('chat')}}
        >
          Message
        </button>
      </div>
      <div className="btn">
        <button
          className='background-bad-color btn-style'
        // onClick={deleteFriend}
        >
          Unfriend
        </button>
      </div>
    </div>
    </>
  );
}      