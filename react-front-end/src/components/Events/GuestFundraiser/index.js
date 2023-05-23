import React, { useState, useEffect } from 'react';
import './styles.scss';
import axios from 'axios';

import ConfirmGuestFundraiser from './Confirm';
// import EmptyGuestFundraiser from './Empty';
import ErrorGuestFundraiser from './Error';
import HeaderGuestFundraiser from './Header';
import SetupGuestFundraiser from './Setup';
import ShowGuestFundraiser from './Show';
import StatusGuestFundraiser from './Status';
import useVisualMode from 'hooks/useVisualMode';


export default function GuestFundraiser(props) {

  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const SUPPORT = "SUPPORT";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { fundraiser, setFundraiser } = props;

  const { mode, transition, back } = useVisualMode(
    // ((fundraiser.empty==="no") ? SHOW :  EMPTY )
    SHOW
  );

  console.log('mode', mode);

  const addGuestFundraiser = (value) => {

    const data = {
      amount: value?.amount,
      user:props?.user,
      fundraiser:fundraiser?.id,
      pay_method: value?.pay_method,
      pay_status: 'Completed',
      pay_anonymous: value?.pay_anonymous,
      message:value?.message
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

    addGuestFundraiser(value)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));

  };

  return (
    <article className="">
      <HeaderGuestFundraiser />

      {mode === SHOW && (
        <ShowGuestFundraiser
          donation={fundraiser}
          onSupport={() => transition(SUPPORT)}
        />
      )
      }

      {mode === SUPPORT && (
        <SetupGuestFundraiser
          donation={fundraiser}
          onSave={save}
          onCancel={back}
        />
      )
      }

      {mode === SAVING && (
        <StatusGuestFundraiser
          message={"Processing"}
          onComplete={() => transition(SHOW)}
        />
      )
      }

      {mode === CONFIRM && (
        <ConfirmGuestFundraiser
          message={"Are you sure you want to cancel?"}
          // onConfirm={destory}
          onCancel={back}
        />
      )
      }

      {mode === DELETING && (
        <StatusGuestFundraiser
          message={"canceling"}
          // onComplete={() => transition(EMPTY)}
        />
      )
      }

      {mode === ERROR_DELETE && (
        <ErrorGuestFundraiser
          message={"Could not delete fundraiser"}
          onClose={back}
        />
      )
      }

      {mode === ERROR_SAVE && (
        <ErrorGuestFundraiser
          message={"Could not save fundraiser"}
          onClose={back}
        />
      )
      }

    </article>
  );
}