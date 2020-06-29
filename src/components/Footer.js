import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

import { Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  const { transactions } = useContext(GlobalContext);
  const { deleteTransactions } = useContext(GlobalContext);
  return (
    <Row id="footer" className="bg-white pt-3 fixed-bottom border-top">
      <Col className="text-right">
        <Button
          className="bg-transparent btn p-0 border-0"
          onClick={() => deleteTransactions(transactions)}
        >
          <FontAwesomeIcon
            className="fa-lg text-purple text-dark"
            icon={faRedo}
          />
          <p className="d-block text-secondary sm-title-text">Clear All</p>
        </Button>
      </Col>
    </Row>
  );
};
