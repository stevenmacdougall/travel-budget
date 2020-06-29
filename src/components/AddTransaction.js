import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

import PurchaseInputs from "./PurchaseInputs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const history = useHistory();

  const [text, setText] = useState("");
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

  const { addTransaction } = useContext(GlobalContext);
  const { currencys } = useContext(GlobalContext);

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
    if (text !== "") {
      e.preventDefault();
      let path = `/`;
      history.push(path);
    } else {
      alert("Please enter purchase description.");
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amountTo: +amountTo,
      selectedCurrencyTo,
      toSymbol,
      fromSymbol,
      amountFrom: +amountFrom,
      selectedCurrencyFrom,
    };
    if (text !== "") {
      addTransaction(newTransaction);
    }
  };

  return (
    <>
      {isNaN(currencys) ? (
        <Row>
          <Col>
            <Card className="pl-3 pr-3 pt-5 border-0 rounded-0 h-100">
              <Card.Header className="pt-5 border-0 bg-white">
                <Link to="/settings" className="text-dark mb-3 pt-5">
                  <FontAwesomeIcon
                    className="fa-lg text-dark"
                    icon={faArrowLeft}
                  />
                </Link>
                <h1 className="md-title-text text-center mt-5">
                  Add An Expense
                </h1>{" "}
              </Card.Header>
              <Card.Body>
                <p className="sm-title-text text-secondary mb-5 text-center">
                  Enter your expense details below
                </p>
                <div className="mb-3 d-inline-block">
                  <label htmlFor="text xs-title-text text-secondary">
                    Expense Description:{" "}
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter item name..."
                    className="input pl-4 pr-4 pt-3 pb-3 shadow-0 border-light rounded-50 text-secondary ml-2 mr-2"
                  />
                </div>
                <div className="mb-3">
                  <span className="d-inline">{toSymbol}</span>
                  <PurchaseInputs
                    className="d-inline"
                    selectedCurrency={toCurrency}
                    onChangeAmount={handleToAmountChange}
                    amount={toAmount}
                  />
                </div>
                <div>
                  <span className="d-inline">{fromSymbol}</span>
                  <PurchaseInputs
                    className="d-inline"
                    selectedCurrency={fromCurrency}
                    onChangeAmount={handleFromAmountChange}
                    amount={fromAmount}
                  />
                </div>
              </Card.Body>
              <Card.Footer className="border-0 bg-white text-center">
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
            <Card className="pl-3 pr-3 pt-5 border-0 rounded-0 h-100">
              <Card.Header className="pt-5 border-0 bg-white">
                <Link to="/settings" className="text-dark mb-3 pt-5">
                  <FontAwesomeIcon
                    className="fa-lg text-dark"
                    icon={faArrowLeft}
                  />
                </Link>
                <h1 className="md-title-text text-center mt-5">
                  Before Add An Expense
                </h1>{" "}
              </Card.Header>
              <Card.Body>
                <p className="text-center mb-4 sm-title-text text-secondary">
                  Please set your currency preferences before you add an
                  expense.
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
