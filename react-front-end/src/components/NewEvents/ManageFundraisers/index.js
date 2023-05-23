import React, { useState, useEffect } from 'react';
import './styles.scss';
import axios from 'axios';

import ConfirmFundraiser from './Confirm';
import EmptyFundraiser from './Empty';
import ErrorFundraiser from './Error';
import HeaderFundraiser from './Header';
import SetupFundraiser from './Setup';
import ShowFundraiser from './Show';
import StatusFundraiser from './Status';
import useVisualMode from 'hooks/useVisualMode';


export default function ManageFundraisers(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { event} = props;

  const [fundraiser, setFundraiser] = useState({
    title: "",
    target_amount: "",
    current_amount: "",
    id: "",
    event_id: ""
    // empty:""
  });

  useEffect(() => {

    console.log('get fundraiser for event', event);

    axios.get(`/api/fundraisers/${event}`)
      .then((res) => {
        console.log(res.data);
        setFundraiser(res.data);
        // if (Object.keys(res.data).length != 0) {
        //   setFundraiser({...res.data, empty: "no" });
        // }
      })
      .catch(err => console.log(err));

  }, []);

  console.log(fundraiser.empty === "no", fundraiser);

  const { mode, transition, back } = useVisualMode(
    // ((fundraiser.empty==="no") ? SHOW :  EMPTY )
    EMPTY
  );

  console.log('mode', mode);

  const addFundraiser = (title, target) => {

    const data = {
      event_id: event,
      title: title,
      target: target
    };

    console.log("add new fundraiser: ", data);

    return axios.post(`/api/fundraisers/`, data)
      .then(res => {
        console.log(res.data);

        axios.get(`/api/fundraisers/${event}`)
          .then((res) => {
            console.log(res.data);
            setFundraiser(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };


  const editFundraiser = (new_title, new_target) => {

    const data = {
      title: new_title,
      target: new_target
    };

    console.log("update fundraiser: ", data);

    return axios.put(`/api/fundraisers/${fundraiser.id}`, data)
      .then(res => {
        console.log(res.data);

        axios.get(`/api/fundraisers/${event}`)
          .then((res) => {
            console.log(res.data);
            setFundraiser(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };



  const removeFundraiser = (id) => {

    console.log('Delete fundraiser:', id);

    return axios.delete(`/api/fundraisers/${id}/delete`)
      .then(res => {
        console.log(res.data);

        axios.get(`/api/fundraisers/${event}`)
          .then((res) => {
            console.log(res.data);
            setFundraiser(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };



  function save(title, target) {

    transition(SAVING);

    addFundraiser(title, target)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));

  }

  function edit(title, target) {

    transition(SAVING);

    editFundraiser(title, target)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));

  }


  function destory() {
    transition(DELETING, true);

    removeFundraiser(fundraiser.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }



  return (
    <article className="">
      <HeaderFundraiser />
      {mode === EMPTY && <EmptyFundraiser onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <ShowFundraiser
          donation={fundraiser}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )
      }

      {mode === EDIT && (
        <SetupFundraiser
          event={event}
          donation={fundraiser}
          onSave={edit}
          onCancel={back}
        />
      )
      }

      {mode === CREATE && (
        <SetupFundraiser
          donation={fundraiser}
          event={event}
          onSave={save}
          onCancel={back}
        />
      )
      }

      {mode === SAVING && (
        <StatusFundraiser
          message={"Saving"}
          onComplete={() => {transition(SHOW)}}
        />
      )
      }

      {mode === CONFIRM && (
        <ConfirmFundraiser
          message={"Are you sure you want to delete?"}
          onConfirm={destory}
          onCancel={back}
        />
      )
      }

      {mode === DELETING && (
        <StatusFundraiser
          message={"Deleting"}
          onComplete={() => transition(EMPTY)}
        />
      )
      }

      {mode === ERROR_DELETE && (
        <ErrorFundraiser
          message={"Could not delete fundraiser"}
          onClose={back}
        />
      )
      }

      {mode === ERROR_SAVE && (
        <ErrorFundraiser
          message={"Could not save fundraiser"}
          onClose={back}
        />
      )
      }

    </article>
  );
}