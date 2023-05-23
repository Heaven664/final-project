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
import useVisualMode from 'hooks/useVisualMode';


export default function HostFundraiser(props) {

  const SHOW = "SHOW";
  const SAVING = "SAVING";
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

    console.log(event.event_date, mature, dateDiff)

  console.log('mode', mode);

  const addHostFundraiser = (value) => {

    const data = {
      amount: value?.amount,
      user: props?.user,
      fundraiser: fundraiser?.id,
      pay_method: value?.pay_method,
      pay_status: 'Completed',
      pay_anonymous: value?.pay_anonymous
    };

    console.log("add new fundraiser transaction: ", data);

    return axios.post(`/api/fundraiser-user/`, data)
      .then(res => {
        console.log(res.data);

        axios.put(`/api/fundraisers/current/${data?.fundraiser}`)
          .then((res) => {
            console.log(res.data);
            setFundraiser(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  function save(value) {

    transition(SAVING);

    addHostFundraiser(value)
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
        <SetupHostFundraiser
          donation={fundraiser}
          onSave={save}
          onCancel={back}
        />
      )
      }

      {mode === SAVING && (
        <StatusHostFundraiser
          message={"Processing"}
          onComplete={() => transition(SHOW)}
        />
      )
      }

      {mode === CONFIRM && (
        <ConfirmHostFundraiser
          message={"Are you sure you want to cancel?"}
          // onConfirm={destory}
          onCancel={back}
        />
      )
      }

      {mode === DELETING && (
        <StatusHostFundraiser
          message={"canceling"}
        // onComplete={() => transition(EMPTY)}
        />
      )
      }

      {mode === ERROR_DELETE && (
        <ErrorHostFundraiser
          message={"Could not delete fundraiser"}
          onClose={back}
        />
      )
      }

      {mode === ERROR_SAVE && (
        <ErrorHostFundraiser
          message={"Could not save fundraiser"}
          onClose={back}
        />
      )
      }

    </article>
  );
}