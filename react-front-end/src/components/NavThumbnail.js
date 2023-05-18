import React, { useState } from "react";

export default function NavThumnail(props) {

  const handlePageClick = () => {
    props.handlePageClick('friends');
  };

  return (
    <div onClick={() => handlePageClick('setting')}>
      {!props.user && <div 
        className="thumbnail" 
        style={{ backgroundImage: `url()` }}>
      </div>}
      {props.user && <div 
        className="thumbnail" 
        style={{ backgroundImage: `url(${props.user.photo})` }}>
      </div>}
    </div>
  );
}
