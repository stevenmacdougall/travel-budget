import React from "react";

export default function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency } = props;
  return (
    <div className="text-center">
      <select
        className="p-3 rounded-50 w-100 border-light text-secondary"
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
