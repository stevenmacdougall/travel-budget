import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

import PurchaseInputs from "./PurchaseInputs";

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
                <h1 className="title-text">Add purchase</h1>
              </Card.Header>
              <Card.Body>
                <div className="mb-3 d-inline-block">
                  <label htmlFor="text">Purchase Description: </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter item name..."
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
                Please set your currency preferences before adding your
                purchases.
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
