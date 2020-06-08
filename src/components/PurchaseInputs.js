import React from "react";

export default function PurchaseInputs(props) {
  const { selectedCurrency, onChangeAmount, amount } = props;

  return (
    <>
      <input
        type="number"
        className="input"
        value={amount}
        placeholder="0.00"
        onChange={onChangeAmount}
      />
      <span className="d-inline"> {selectedCurrency}</span>
    </>
  );
}
