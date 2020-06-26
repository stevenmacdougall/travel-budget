import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

import { Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  const { transactions } = useContext(GlobalContext);
  const { deleteTransactions } = useContext(GlobalContext);
  return (
    <Row className="footer pt-3 bg-white fixed-bottom border-top">
      <Col className="text-right pr-5">
        <Button
          className="bg-transparent btn p-0 border-0"
          onClick={() => deleteTransactions(transactions)}
        >
          <FontAwesomeIcon
            className="fa-md text-purple text-dark"
            icon={faRedo}
          />
          <p className="d-block text-secondary sm-title-text">Clear All</p>
        </Button>
      </Col>
    </Row>
  );
};
