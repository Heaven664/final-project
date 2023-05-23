import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function EmptyFundraiser(props) {

  return (
    <main className="fundraiser__add">
      <button onClick={props.onAdd}
        className="background-point-color btn-style"> Add a Fundraiser!
        <FontAwesomeIcon className="plusIcon" icon={faPlus}/>
        </button>
    </main>
  );
}