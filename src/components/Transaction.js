import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

import { Button, ListGroup, Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  var toAmount = Math.abs(transaction.amountTo);
  var displayToAmount = toAmount.toFixed(2);

  var fromAmount = Math.abs(transaction.amountFrom);
  var displayFromAmount = fromAmount.toFixed(2);

  return (
    <ListGroup.Item className="shadow mb-2">
      <Row>
        <Col xs={1} className="text-left">
          <FontAwesomeIcon className="fa-lg" icon={faShoppingBag} />
        </Col>
        <Col xs={4} className="text-left">
          {transaction.text}
        </Col>
        <Col className="text-left">
          <span className="text-minus d-block">
            {transaction.toSymbol}
            {displayToAmount} {transaction.selectedCurrencyTo}
          </span>
          <small className="d-block">
            {transaction.fromSymbol}
            {displayFromAmount} {transaction.selectedCurrencyFrom}
          </small>
        </Col>
        <Col className="text-right">
          <Button
            className="bg-transparent border-0 p-0"
            onClick={() => deleteTransaction(transaction.id)}
          >
            <FontAwesomeIcon
              className="fa-lg text-minus"
              icon={faTimesCircle}
            />
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
