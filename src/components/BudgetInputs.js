import React from "react";

export default function BudgetInputs(props) {
  const { selectedCurrency, onChangeAmount, amount } = props;

  return (
    <>
      <input
        type="number"
        className="input pl-4 pr-4 pt-3 pb-3 shadow border-0 rounded-50 text-secondary ml-2 mr-2"
        value={amount}
        placeholder="0.00"
        onChange={onChangeAmount}
      />
      <span className="d-inline font-weight-bold sm-title-text text-secondary">
        {selectedCurrency}
      </span>
    </>
  );
}
