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
      <Card id="expenses-list" className="p-4 border-0 bg-light-blue">
        <Row className="mt-3 mb-4">
          <Col className="pt-2">
            <h3 className="font-weight-bold md-title-text d-inline">
              All Expenses
            </h3>
          </Col>
          <Col className="text-right">
            <Link to="/add-transaction">
              <FontAwesomeIcon
                className="fa-3x text-blue bg-white rounded-circle shadow"
                icon={faPlusCircle}
              />
            </Link>
          </Col>
        </Row>
        <ListGroup>
          {transactions < 1 ? (
            <p className="mt-3 text-center">Expenses List is Empty</p>
          ) : (
            transactions.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))
          )}
        </ListGroup>
      </Card>
    </>
  );
};
