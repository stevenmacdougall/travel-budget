import React, { useContext } from "react";
import { Transaction } from "./Transaction";
import { Link } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

import { Row, Col, Card, ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <Card className="p-3 mb-2 shadow">
        <Row>
          <Col>
            <h3 className="font-weight-bold title-text d-inline align-middle">
              Purchases
            </h3>
          </Col>
          <Col className="text-right">
            <Link to="/add-transaction">
              <FontAwesomeIcon
                className="fa-2x text-dark bg-white rounded-circle align-middle"
                icon={faPlusCircle}
              />
            </Link>
          </Col>
        </Row>
      </Card>
      <ListGroup>
        {transactions < 1 ? (
          <p className="mt-3 text-center">Purchases is Empty.</p>
        ) : (
          transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))
        )}
      </ListGroup>
    </>
  );
};
