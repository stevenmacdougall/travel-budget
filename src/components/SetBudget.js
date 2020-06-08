import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

import BudgetInputs from "./BudgetInputs";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App(currency) {
  const history = useHistory();

  const [exchangeRate, setExchangeRate] = useState(true);
  const [amount, setAmount] = useState("");
  const [amountInFromCurrency, setAmountInFromCurrency] = useState();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  });

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const { addBudget } = useContext(GlobalContext);
  const { currencys } = useContext(GlobalContext);

  const { budgets } = useContext(GlobalContext);

  const { clearBudget } = useContext(GlobalContext);

  // Currency name
  const toCurrency = currencys.map((currency) => currency.selectedCurrencyTo);
  const fromCurrency = currencys.map(
    (currency) => currency.selectedCurrencyFrom
  );

  // Currency symbol
  const toSymbol = currencys.map((currency) => currency.toSymbol);
  const fromSymbol = currencys.map((currency) => currency.fromSymbol);

  var amountTo = toAmount;
  const selectedCurrencyTo = toCurrency;
  const amountFrom = fromAmount;
  const selectedCurrencyFrom = fromCurrency;

  const onSubmit = (e) => {
    e.preventDefault();
    let path = `/`;
    history.push(path);
    clearBudget(budgets);

    const newBudget = {
      id: Math.floor(Math.random() * 100000000),
      amountTo: +amountTo,
      selectedCurrencyTo,
      toSymbol,
      fromSymbol,
      amountFrom: +amountFrom,
      selectedCurrencyFrom,
    };
    addBudget(newBudget);
  };

  return (
    <>
      <Row>
        <Col>
          <Link to="/">
            <p className="d-block text-secondary sm-title-text">
              Back to Dashboard
            </p>
          </Link>
        </Col>
      </Row>
      {isNaN(currencys) ? (
        <Row>
          <Col>
            <Card>
              <Card.Header className="p-4">
                <h1 className="title-text">Set your trip budget</h1>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <span className="d-inline">{toSymbol}</span>
                  <BudgetInputs
                    className="d-inline"
                    selectedCurrency={toCurrency}
                    onChangeAmount={handleToAmountChange}
                    amount={toAmount}
                  />
                </div>
                <div>
                  <span className="d-inline">{fromSymbol}</span>
                  <BudgetInputs
                    className="d-inline"
                    selectedCurrency={fromCurrency}
                    onChangeAmount={handleFromAmountChange}
                    amount={fromAmount}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <Button onClick={onSubmit} variant="btn btn-outline-purple">
                  Add
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card className="p-5">
              <p>
                Please set your currency preferences before setting a your
                budget.
              </p>
              <Link to="/set-currency">
                <p className="d-block text-secondary sm-title-text">
                  Currency Preferences
                </p>
              </Link>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default App;
