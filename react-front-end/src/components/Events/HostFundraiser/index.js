import React, { useState, useEffect } from 'react';
import './styles.scss';
import axios from 'axios';

import ConfirmHostFundraiser from './Confirm';
// import EmptyHostFundraiser from './Empty';
import ErrorHostFundraiser from './Error';
import HeaderHostFundraiser from './Header';
import SetupHostFundraiser from './Setup';
import ShowHostFundraiser from './Show';
import StatusHostFundraiser from './Status';
import CollectHostFundraiser from './Collect';
import useVisualMode from 'hooks/useVisualMode';


export default function HostFundraiser(props) {

  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const PROCESSING = "PROCESSING";
  const CONFIRM = "CONFIRM";
  const MODIFY = "MODIFY";
  const COLLECT = "COLLECT";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { fundraiser, setFundraiser, event } = props;

  const { mode, transition, back } = useVisualMode(
    // ((fundraiser.empty==="no") ? SHOW :  EMPTY )
    SHOW
  );

  const eventDate = new Date(event.event_date);
  const dateDiff = (eventDate.getTime() - Date.now());
  const mature = (dateDiff <= 0 ? true : false);

  console.log(event.event_date, mature, dateDiff);

  console.log('mode', mode);

  const editHostFundraiser = (value) => {

    console.log("edit fundraiser: ", value);

    return axios.put(`/api/fundraisers/${fundraiser.id}`, value)
      .then(res => {
        console.log(res.data);
        setFundraiser(res.data);
      })
      .catch(err => console.log(err));
  };


  const collectHostFundraiser = () => {

    console.log("collect fundraiser: ", fundraiser?.id);

    return axios.put(`/api/fundraisers/collect/${fundraiser?.id}`)
      .then(res => {
        console.log(res.data);
        setFundraiser(res.data);
      })
      .catch(err => console.log(err));
  };

  function save(value) {

    transition(SAVING);

    editHostFundraiser(value)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));

  };

  function collect() {

    transition(PROCESSING);

    collectHostFundraiser()
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));

  };

  return (
    <article className="">
      <HeaderHostFundraiser />

      {mode === SHOW && (
        <ShowHostFundraiser
          donation={fundraiser}
          onModify={() => transition(MODIFY)}
          onCollect={() => transition(COLLECT)}
          mature={mature}
          collected={fundraiser?.collected}
          collected_date={fundraiser?.collected_date}
        />
      )
      }

      {mode === MODIFY && (
        <SetupHostFundraiser
          donation={fundraiser}
          onSave={save}
          onCancel={back}
        />
      )
      }

      {mode === COLLECT && (
        <CollectHostFundraiser
          donation={fundraiser}
          onCollect={collect}
          onCancel={back}
        />
      )
      }

      {mode === SAVING && (
        <StatusHostFundraiser
          message={"Saving"}
          onComplete={() => transition(SHOW)}
        />
      )
      }

      {mode === PROCESSING && (
        <StatusHostFundraiser
          message={"Processing"}
          onComplete={() => transition(SHOW)}
        />
      )
      }

      {mode === ERROR_DELETE && (
        <ErrorHostFundraiser
          message={"Could not delete"}
          onClose={back}
        />
      )
      }

      {mode === ERROR_SAVE && (
        <ErrorHostFundraiser
          message={"Could not save"}
          onClose={back}
        />
      )
      }

    </article>
  );
}