import React from "react";

export default function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency } = props;
  return (
    <div>
      <select
        className="p-3"
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
