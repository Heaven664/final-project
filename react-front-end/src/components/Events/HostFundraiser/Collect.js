import React, { useState } from 'react';
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function CollectHostFundraiser(props) {

  const [error, setError] = useState("");

  const { donation } = props;

  const [state, setState] = useState({
    pay_method: "",
  });

  const maxAmount = donation?.target_amount - donation?.current_amount;


  const reset = () => { setState({ pay_method: "" }); };

  const cancel = () => { reset(); props.onCancel(); };

  function validate() {

    if (state.pay_method === "") {
      setError("Please choose a payment method!");
      return;
    }

    props.onCollect(state);

    setError("");
  }

  return (
    <main className="fundraiser-collect">

      <section className="">
        <form onSubmit={(event) => { event.preventDefault(); }}>

            <label>
              Payment Method:<br />
              <select name="host-fundraiser-pay-method" className="host-fundraiser-pay-method"
                onChange={(e) => setState({ ...state, pay_method: e.target.value })}>
                <option value="" selected disabled hidden>--Please Choose--</option>
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
                <option value="AMEX">AMEX</option>
                <option value="PayPal" >PayPal</option>
                <option value="CASH" >CASH</option>
                <option value="Bitcoin" >Bitcoin</option>
              </select>
            </label>

        </form >
        <section className="host-fundraiser__validation">{error}</section>
      </section>

      <section className="host-fundraiser__card-right">

        <button onClick={cancel}
          className="btn-style background-bad-color"> Cancel
        </button>

        <button onClick={validate}
          className="btn-style background-fundraiser-color"> Process
        </button>

      </section>
    </main>
  );
};