import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

import CurrencySelect from "./CurrencySelect";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const { currencys } = useContext(GlobalContext);
  const { clearCurrency } = useContext(GlobalContext);
  const { transactions } = useContext(GlobalContext);
  const { deleteTransactions } = useContext(GlobalContext);

  const history = useHistory();

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[26];
        const secondCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(secondCurrency);
        setToCurrency(firstCurrency);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`
      ).then((res) => res.json());
    }
  }, [fromCurrency, toCurrency]);

  const { addCurrency } = useContext(GlobalContext);

  const selectedCurrencyTo = toCurrency;
  const selectedCurrencyFrom = fromCurrency;

  // Currency symbol currency converted from

  let fromSymbol;
  if (
    selectedCurrencyFrom === "USD" ||
    selectedCurrencyFrom === "CAD" ||
    selectedCurrencyFrom === "AUD" ||
    selectedCurrencyFrom === "NZD" ||
    selectedCurrencyFrom === "MXN" ||
    selectedCurrencyFrom === "SGD" ||
    selectedCurrencyFrom === "HKD"
  ) {
    fromSymbol = "\u0024";
  } else if (selectedCurrencyFrom === "EUR") {
    fromSymbol = "\u20AC";
  } else if (selectedCurrencyFrom === "JPY" || selectedCurrencyFrom === "CNY") {
    fromSymbol = "\u00A5";
  } else if (selectedCurrencyFrom === "GBP") {
    fromSymbol = "\u00A3";
  } else if (selectedCurrencyFrom === "CHF") {
    fromSymbol = "\u0043\u0048\u0046";
  } else if (
    selectedCurrencyFrom === "SEK" ||
    selectedCurrencyFrom === "NOK" ||
    selectedCurrencyFrom === "ISK" ||
    selectedCurrencyFrom === "DKK"
  ) {
    fromSymbol = "\u006B\u0072";
  } else if (selectedCurrencyFrom === "KRW") {
    fromSymbol = "\u20A9";
  } else if (selectedCurrencyFrom === "TRY") {
    fromSymbol = "\u20BA";
  } else if (selectedCurrencyFrom === "RUB") {
    fromSymbol = "\u20BD";
  } else if (selectedCurrencyFrom === "INR") {
    fromSymbol = "\u20B9";
  } else if (selectedCurrencyFrom === "BRL") {
    fromSymbol = "\u0052\u0024";
  } else if (selectedCurrencyFrom === "ZAR") {
    fromSymbol = "\u0052";
  } else if (selectedCurrencyFrom === "PHP") {
    fromSymbol = "\u20B1";
  } else if (selectedCurrencyFrom === "CZK") {
    fromSymbol = "\u004B\u010D";
  } else if (selectedCurrencyFrom === "IDR") {
    fromSymbol = "\u0052\u0070";
  } else if (selectedCurrencyFrom === "MYR") {
    fromSymbol = "\u0052\u004D";
  } else if (selectedCurrencyFrom === "HUF") {
    fromSymbol = "\u0046\u0074";
  } else if (selectedCurrencyFrom === "HRK") {
    fromSymbol = "\u006B\u006E";
  } else if (selectedCurrencyFrom === "BGN") {
    fromSymbol = "\u043B\u0432";
  } else if (selectedCurrencyFrom === "RON") {
    fromSymbol = "\u006C\u0065\u0069";
  } else if (selectedCurrencyFrom === "THB") {
    fromSymbol = "\u0E3F";
  } else if (selectedCurrencyFrom === "PLN") {
    fromSymbol = "\u007A\u0142";
  } else if (selectedCurrencyFrom === "ILS") {
    fromSymbol = "\u20AA";
  } else {
    fromSymbol = "none";
  }
  // Currency symbol currency converted to
  let toSymbol;
  if (
    selectedCurrencyTo === "USD" ||
    selectedCurrencyTo === "CAD" ||
    selectedCurrencyTo === "AUD" ||
    selectedCurrencyTo === "NZD" ||
    selectedCurrencyTo === "MXN" ||
    selectedCurrencyTo === "SGD" ||
    selectedCurrencyTo === "HKD"
  ) {
    toSymbol = "\u0024";
  } else if (selectedCurrencyTo === "EUR") {
    toSymbol = "\u20AC";
  } else if (selectedCurrencyTo === "JPY" || selectedCurrencyTo === "CNY") {
    toSymbol = "\u00A5";
  } else if (selectedCurrencyTo === "GBP") {
    toSymbol = "\u00A3";
  } else if (selectedCurrencyTo === "CHF") {
    toSymbol = "\u0043\u0048\u0046";
  } else if (
    selectedCurrencyTo === "SEK" ||
    selectedCurrencyTo === "NOK" ||
    selectedCurrencyTo === "ISK" ||
    selectedCurrencyTo === "DKK"
  ) {
    toSymbol = "\u006B\u0072";
  } else if (selectedCurrencyTo === "KRW") {
    toSymbol = "\u20A9";
  } else if (selectedCurrencyTo === "TRY") {
    toSymbol = "\u20BA";
  } else if (selectedCurrencyTo === "RUB") {
    toSymbol = "\u20BD";
  } else if (selectedCurrencyTo === "INR") {
    toSymbol = "\u20B9";
  } else if (selectedCurrencyTo === "BRL") {
    toSymbol = "\u0052\u0024";
  } else if (selectedCurrencyTo === "ZAR") {
    toSymbol = "\u0052";
  } else if (selectedCurrencyTo === "PHP") {
    toSymbol = "\u20B1";
  } else if (selectedCurrencyTo === "CZK") {
    toSymbol = "\u004B\u010D";
  } else if (selectedCurrencyTo === "IDR") {
    toSymbol = "\u0052\u0070";
  } else if (selectedCurrencyTo === "MYR") {
    toSymbol = "\u0052\u004D";
  } else if (selectedCurrencyTo === "HUF") {
    toSymbol = "\u0046\u0074";
  } else if (selectedCurrencyTo === "HRK") {
    toSymbol = "\u006B\u006E";
  } else if (selectedCurrencyTo === "BGN") {
    toSymbol = "\u043B\u0432";
  } else if (selectedCurrencyTo === "RON") {
    toSymbol = "\u006C\u0065\u0069";
  } else if (selectedCurrencyTo === "THB") {
    toSymbol = "\u0E3F";
  } else if (selectedCurrencyTo === "PLN") {
    toSymbol = "\u007A\u0142";
  } else if (selectedCurrencyTo === "ILS") {
    toSymbol = "\u20AA";
  } else {
    toSymbol = "none";
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let path = `/`;
    history.push(path);
    clearCurrency(currencys);
    deleteTransactions(transactions);

    const newCurrency = {
      id: Math.floor(Math.random() * 100000000),
      selectedCurrencyTo,
      selectedCurrencyFrom,
      toSymbol,
      fromSymbol,
    };

    addCurrency(newCurrency);
  };

  return (
    <>
      <Row>
        <Col>
          <Link to="/">
            <p className="d-block text-white sm-title-text">
              Back to Dashboard
            </p>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Header className="p-4">
              <h1 className="title-text">
                Set Currency Preferences for your trip
              </h1>
            </Card.Header>
            <Card.Body>
              <p className="">Select your usual currency:</p>
              <CurrencySelect
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              />
              <p className="mt-4">
                Select the currency of the country you are visiting:
              </p>
              <CurrencySelect
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
              />
            </Card.Body>
            <Card.Footer>
              <Button onClick={onSubmit} variant="btn btn-outline-blue">
                Set
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default App;
