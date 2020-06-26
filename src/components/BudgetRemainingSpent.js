import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

import { Row, Col, Card } from "react-bootstrap";

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
          <h4 className="sm-title-text mb-0 text-white">Remaining</h4>
          <p className="mb-0 lg-text text-white font-weight-bold">
            {toCurrencySymbol}
            {displayRemainingTo} {budgetToCurrency}
          </p>
          <p className="title-text mb-0 text-light">
            {fromCurrencySymbol}
            {displayRemainingFrom} {budgetFromCurrency}
          </p>
          <p className="text-minus">
            {displayRemainingTo < 0 ? "You have gone over your budget." : ""}
          </p>
          {isNaN(budgets) ? (
            ""
          ) : (
            <Link to="set-budget" className="text-white mb-3">
              Set Budget
            </Link>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col
          xs={{ span: 6, offset: 0 }}
          md={{ span: 3, offset: 0 }}
          className="text-center"
        >
          <Card className="p-3">
            <h4 className="sm-title-text mb-0">Budget</h4>
            <p className="title-text mb-0 text-plus font-weight-bold">
              {toCurrencySymbol}
              {displayBudgetTo} {budgetToCurrency}{" "}
            </p>
            <p className="sm-title-text mb-0 text-light">
              {fromCurrencySymbol}
              {displayBudgetFrom} {budgetFromCurrency}
            </p>
          </Card>
        </Col>
        <Col
          xs={{ span: 6, offset: 0 }}
          md={{ span: 3, offset: 6 }}
          className="text-center"
        >
          <Card className="p-3">
            <h4 className="sm-title-text mb-0">Spent</h4>
            <p className="title-text mb-0 text-minus font-weight-bold">
              {toCurrencySymbol}
              {displaySpentTo} {budgetToCurrency}{" "}
            </p>
            <p className="sm-title-text mb-0 text-light">
              {fromCurrencySymbol}
              {displaySpentFrom} {budgetFromCurrency}
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
};
