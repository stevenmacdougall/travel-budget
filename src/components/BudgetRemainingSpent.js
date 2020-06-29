import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

import { Row, Col } from "react-bootstrap";

export const BudgetRemainingSpent = () => {
  const { budgets } = useContext(GlobalContext);
  const { transactions } = useContext(GlobalContext);
  const { currencys } = useContext(GlobalContext);

  const spentTo = transactions.map((transaction) => transaction.amountTo);
  const spentFrom = transactions.map((transaction) => transaction.amountFrom);

  const budgetTo = budgets.map((budget) => budget.amountTo);
  const budgetFrom = budgets.map((budget) => budget.amountFrom);

  // Currency name
  const budgetToCurrency = currencys.map(
    (currency) => currency.selectedCurrencyTo
  );

  const budgetFromCurrency = currencys.map(
    (currency) => currency.selectedCurrencyFrom
  );

  // Currency symbol
  const toCurrencySymbol = currencys.map((currency) => currency.toSymbol);
  const fromCurrencySymbol = currencys.map((currency) => currency.fromSymbol);

  const displayBudgetTo = budgetTo
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const displayBudgetFrom = budgetFrom
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const displaySpentTo = spentTo
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const displaySpentFrom = spentFrom
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const remainingTo = displayBudgetTo - displaySpentTo;
  const displayRemainingTo = remainingTo.toFixed(2);

  const remainingFrom = displayBudgetFrom - displaySpentFrom;
  const displayRemainingFrom = remainingFrom.toFixed(2);

  return (
    <>
      <Row className="text-center pl-4 pr-4">
        <Col>
          <h4 className="xs-title-text mb-0 text-white">Remaining</h4>
          <p className="mb-0 lg-text text-white font-weight-bold">
            {toCurrencySymbol}
            {displayRemainingTo} {budgetToCurrency}
          </p>
          <p className="title-text mb-0 text-white">
            {fromCurrencySymbol}
            {displayRemainingFrom} {budgetFromCurrency}
          </p>

          {displayRemainingTo < 0
            ? alert("You have gone over your budget.")
            : ""}
        </Col>
      </Row>
      <Row className="pl-4 pr-4 mt-2">
        <Col>
          <h4 className="xs-title-text mb-0 text-white">Budget</h4>
          <p className="sm-title-text mb-0 text-white font-weight-bold">
            {toCurrencySymbol}
            {displayBudgetTo} {budgetToCurrency}{" "}
          </p>
          <p className="xs-title-text mb-0 text-white">
            {fromCurrencySymbol}
            {displayBudgetFrom} {budgetFromCurrency}
          </p>
        </Col>
        <Col className="text-right">
          <h4 className="xs-title-text mb-0 text-white">Spent</h4>
          <p className="sm-title-text mb-0 text-white font-weight-bold">
            {toCurrencySymbol}
            {displaySpentTo} {budgetToCurrency}{" "}
          </p>
          <p className="xs-title-text mb-0 text-white">
            {fromCurrencySymbol}
            {displaySpentFrom} {budgetFromCurrency}
          </p>
        </Col>
      </Row>
    </>
  );
};
