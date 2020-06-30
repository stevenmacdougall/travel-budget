import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const Settings = () => {
  const history = useHistory();

  const { clearBudget } = useContext(GlobalContext);
  const { budgets } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    let path = `/`;
    history.push(path);
    clearBudget(budgets);
  };

  return (
    <Row>
      <Col>
        <Card className="pl-3 pr-3 pt-5 border-0 rounded-0 h-100">
          <Card.Header className="pt-5 border-0 bg-white">
            <Link to="/" className="text-dark mb-3 pt-5">
              <FontAwesomeIcon
                className="fa-lg text-dark"
                icon={faChevronLeft}
              />
            </Link>
            <h1 className="md-title-text text-center mt-5">Settings</h1>{" "}
          </Card.Header>
          <Card.Body>
            <Link
              to="/set-currency"
              className="md-title-text text-dark mb-3 text-center bg-light p-2 rounded-50 d-block"
            >
              Currency Preferences
            </Link>
            <Link
              to="set-budget"
              className="md-title-text text-dark mb-3 text-center bg-light p-2 rounded-50 d-block"
            >
              Set Budget
            </Link>
            <Button
              onClick={onSubmit}
              className="text-dark md-title-text border-0 p-0 text-center bg-light p-2 rounded-50 d-block w-100"
            >
              Clear Budget
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
