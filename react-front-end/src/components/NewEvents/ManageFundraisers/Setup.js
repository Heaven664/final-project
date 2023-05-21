import React, { useState } from 'react';
import "./styles.scss";

export default function SetupFundraiser(props) {

  const [error, setError] = useState("");


  const propsTitle = props.donation ? props.donation.title : "";
  const propsTarget = props.donation ? props.donation.target_amount : "";

  const [state, setState] = useState({
    title: propsTitle,
    target_amount: propsTarget
  });


  const reset = () => { setState({ title: "", target_amount: "" }); };

  const cancel = () => { reset(); props.onCancel(); };

  function validate() {
    if (state.title === "") {
      setError("Pleae give your wish a name!");
      return;
    }
    if (state.target_amount === "") {
      setError("Please set a target!");
      return;
    }
    props.onSave(state.title, state.target_amount);
    setError("");
  }

  return (
    <main className="">
      <section className="">
        <form onSubmit={(event) => { event.preventDefault(); }}>
          <label>
            Make a Wish:<br />
            <span id="fundraiser-wish-comment">(It could come true!)</span>
            <input
              className="fundraiser-wishField"
              type="text"
              name="fundraiser-wish"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </label>

          <label>
            Target:<br />
            <span id="fundraiser-target-comment">{""}</span>
            <input
              className="fundraiser-targetField"
              type="number"
              name="fundraiser-target"
              value={state.target_amount}
              onChange={(e) => setState({ ...state, target_amount: e.target.value })}
            />
          </label>

        </form >
        <section className="appointment__validation">{error}</section>
      </section>

      <section className="appointment__card-right">

        <button onClick={cancel}
          className=""> Cancel
        </button>

        <button onClick={validate}
          className=""> Save
        </button>

      </section>
    </main>
  );
};