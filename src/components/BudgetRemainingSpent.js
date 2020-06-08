import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

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
      <Row className="mb-5 text-center">
        <Col>
          <h4 className="sm-title-text mb-0">Remaining</h4>
          <p className="mb-0 lg-text text-plus">
            {toCurrencySymbol}
            {displayRemainingTo} {budgetToCurrency}
          </p>
          <p className="title-text mb-0 text-green">
            {fromCurrencySymbol}
            {displayRemainingFrom} {budgetFromCurrency}
          </p>
          <p className="text-minus">
            {displayRemainingTo < 0 ? "You have gone over your budget." : ""}
          </p>
          {isNaN(budgets) ? (
            ""
          ) : (
            <Link to="set-budget" className="text-dark mb-3">
              Set Budget
            </Link>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h4 className="sm-title-text mb-0">Budget</h4>
          <p className="title-text mb-0 text-green">
            {toCurrencySymbol}
            {displayBudgetTo} {budgetToCurrency}{" "}
          </p>
          <p className="sm-title-text mb-0 text-green">
            {fromCurrencySymbol}
            {displayBudgetFrom} {budgetFromCurrency}
          </p>
        </Col>
        <Col className="text-right">
          <h4 className="sm-title-text mb-0">Spent</h4>
          <p className="title-text mb-0 text-green">
            {toCurrencySymbol}
            {displaySpentTo} {budgetToCurrency}{" "}
          </p>
          <p className="sm-title-text mb-0 text-green">
            {fromCurrencySymbol}
            {displaySpentFrom} {budgetFromCurrency}
          </p>
        </Col>
      </Row>
    </>
  );
};
