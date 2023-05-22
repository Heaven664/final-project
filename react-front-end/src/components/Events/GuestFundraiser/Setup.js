import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SetupGuestFundraiser(props) {

  const [error, setError] = useState("");

  const { donation } = props;

  const [state, setState] = useState({
    amount: 1,
    pay_method: "",
    pay_anonymous: false
  });

  const maxAmount = donation?.target_amount - donation?.current_amount;


  const reset = () => { setState({ amount: "", pay_method: "", pay_anonymous: false }); };

  const cancel = () => { reset(); props.onCancel(); };

  function validate() {
    if (state.amount === "") {
      setError("Pleae specify an amount!");
      return;
    }
    if (state.amount < 1 ) {
      setError("Pleae check the amount entered!");
      return;
    }    
    if (state.amount > maxAmount ) {
      setError("That's more than needed!");
      return;
    }
    if (state.pay_method === "") {
      setError("Please choose a payment method!");
      return;
    }
    props.onSave(state);
    setError("");
  }

  return (
    <main className="">
      <section className="">
        <form onSubmit={(event) => { event.preventDefault(); }}>
          <fieldset>
            <label>
              Amount:<br />
              <span id="fundraiser-target-comment">{""}</span>
              <input
                className="fundraiser-targetField"
                type="number"
                name="guest-fundraiser-amount"
                value={state.amount}
                step={1}
                onChange={(e) => setState({ ...state, amount: e.target.value })}
              />
            </label>

            <label>
              Payment Method:<br />
              <select name="guest-fundraiser-pay-method" className="guest-fundraiser-pay-method"
                onChange={(e) => setState({ ...state, pay_method: e.target.value })}>
                <option value="" selected disabled hidden>--Please Choose--</option>
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
                <option value="AMEX">AMEX</option>
                <option value="PayPal" disabled>PayPal</option>
                <option value="CASH" disabled>CASH</option>
                <option value="Bitcoin" disabled>Bitcoin</option>
              </select>
            </label>

            <label>
            <FontAwesomeIcon icon={faEyeSlash} />
              Anonymous?<br />
              <input
                className="guest-fundraiser-anonymous"
                type="checkbox"
                name="guest-fundraiser-anonymous"
                value="anonymous"
                checked={state.pay_anonymous}
                onChange={(e) => setState({ ...state, pay_anonymous: e.target.checked })}
              />
            </label>

          </fieldset>

        </form >
        <section className="guest-fundraiser__validation">{error}</section>
      </section>

      <section className="guest-fundraiser__card-right">

        <button onClick={cancel}
          className=""> Cancel
        </button>

        <button onClick={validate}
          className=""> Process
        </button>

      </section>
    </main>
  );
};