import React, { useState } from 'react';
import "./styles.scss";

export default function SetupFundraiser(props) {

  const [error, setError] = useState("");

  const [state, setState] = useState({
    title: "",
    target_amount: "",
    event_id:props.event
  });


  const reset = () => { setState({title: "",target_amount: ""})};

  const cancel = () => { reset(); props.onCancel(); };

  function validate() {
    if (state.title === "") {
      setError("Pleae give your wish a name!");
      return;
    }
    if (state.target_amount === null) {
      setError("Please set a target!");
      return;
    }
    props.onSave();
    setError("");
  }

  return (
    <main className="">
      <section className="">
        <form autoComplete="off" onSubmit={(event)=>{event.preventDefault();}}>
        <label>
                  Make a Wish:<br/>
                  <span id="fundraiser-wish-comment">(It could come true!)</span>
                  <textarea
                    className="fundraiser-wishField"
                    type="text"
                    name="fundraiser-wish"
                    onChange={(e) => setState({ ...state, title: e.target.value })}
                  />
                </label>

                <label>
                  Target:<br/>
                  <span id="fundraiser-target-comment">{""}</span>
                  <textarea
                    className="fundraiser-targetField"
                    type="number"
                    name="fundraiser-target"
                    onChange={(e) => setState({ ...state, target_amount: e.target.value })}
                  />
                </label>

        </form >
        <section className="appointment__validation">{error}</section>
      </section>

      <section className="appointment__card-right">

      <button onClick={cancel}
        className="background-point-color btn-style"> Cancel
        </button>

        <button onClick={validate}
        className="background-point-color btn-style"> Save
        </button>

      </section>
    </main>
  );
};