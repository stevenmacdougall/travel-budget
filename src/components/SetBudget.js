import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

import BudgetInputs from "./BudgetInputs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
      {isNaN(currencys) ? (
        <Row>
          <Col>
            <Card className="pl-3 pr-3 pt-5 border-0 rounded-0 h-100 bg-light-blue">
              <Card.Header className="pt-5 border-0 bg-light-blue">
                <Link to="/settings" className="text-dark mb-3 pt-5">
                  <FontAwesomeIcon
                    className="fa-lg text-dark"
                    icon={faChevronLeft}
                  />
                </Link>
                <h1 className="md-title-text text-center mt-5">
                  Let's Get Started
                </h1>{" "}
              </Card.Header>
              <Card.Body>
                <p className="sm-title-text text-secondary mb-3 text-center">
                  Your Budget
                </p>
                <p className="xs-title-text text-secondary mb-5 text-center">
                  Enter your budget in either currency.
                </p>

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
                  <span className="d-inline sm-title-text text-secondary">
                    {fromSymbol}
                  </span>
                  <BudgetInputs
                    className="d-inline"
                    selectedCurrency={fromCurrency}
                    onChangeAmount={handleFromAmountChange}
                    amount={fromAmount}
                  />
                </div>
              </Card.Body>
              <Card.Footer className="border-0 bg-light-blue text-center bg-light-blue">
                <Button
                  onClick={onSubmit}
                  variant="btn btn-blue rounded-50 mb-5"
                >
                  Set
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card className="pl-3 pr-3 pt-5 border-0 bg-light-blue rounded-0 h-100">
              <Card.Header className="pt-5 border-0 bg-light-blue">
                <Link to="/settings" className="text-dark mb-3 pt-5">
                  <FontAwesomeIcon
                    className="fa-lg text-dark"
                    icon={faChevronLeft}
                  />
                </Link>
                <h1 className="md-title-text text-center mt-5">
                  Before You Set Your Budget
                </h1>{" "}
              </Card.Header>
              <Card.Body>
                <p className="text-center mb-4 sm-title-text text-secondary">
                  Please set your currency preferences before setting a your
                  budget.
                </p>
                <Link
                  to="/set-currency"
                  className="md-title-text text-dark mb-3 text-center bg-light p-2 rounded-50 d-block"
                >
                  Currency Preferences
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default App;
