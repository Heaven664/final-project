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
import useEventsData from 'hooks/useEventsData';


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

  const { event } = props;

  const {
    state
  } = useEventsData(event, props.user);


  const state_id = state.fundraisers.id;

  const [fundraiser, setFundraiser] = useState({
    isTrue:null
  });

  console.log('state', state.fundraisers)
  console.log('state 2', fundraiser )

  useEffect(() => {

    console.log('get fundraiser for event', event);

    axios.get(`/api/fundraisers/${event}`)
      .then((res) => {

        setFundraiser(res.data);
        if (res.data){

          setFundraiser({isTrue:true});
        }

        console.log('res data is', res.data, 'fundraiser is', fundraiser, 'istrue is', fundraiser.isTrue);
      })
      .catch(err => console.log(err));
  }, []);









  // const getFundraiser = () => {

  //   return axios.get(`/api/fundraisers/${event}`)
  //     .then(res => {
  //       console.log(res.data);
  //       setFundraiser(res.data);

  //     })
  //     .catch(err => console.log(err));
  // };


  // getFundraiser();  
  
  const { mode, transition, back } = useVisualMode(
    (fundraiser && !fundraiser.id) ? SHOW :  EMPTY 
  );


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



  const removeFundraiser = (id) => {

    console.log('Delete fundraiser:', id);

    return axios.delete(`/api/fundraisers/${id}`)
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
          onSave={save}
          onCancel={back}
        />
      )
      }

      {mode === CREATE && (
        <SetupFundraiser
          event={event}
          onSave={save}
          onCancel={back}
        />
      )
      }

      {mode === SAVING && (
        <StatusFundraiser
          message={"Saving"}
          onComplete={() => transition(SHOW)}
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