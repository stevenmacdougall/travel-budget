import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";

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
    <Row className="mb-3 text-center">
      <Col>
        <Card className="pt-5 pb-5">
          <Link to="/" className="text-dark mb-3">
            Dashboard
          </Link>
          <Link to="/set-currency" className="text-dark mb-3">
            Currency Preferences
          </Link>
          <Link to="set-budget" className="text-dark mb-3">
            Set Budget
          </Link>
          <Button
            onClick={onSubmit}
            className="text-dark bg-transparent border-0 p-0"
          >
            Clear Budget
          </Button>
        </Card>
      </Col>
    </Row>
  );
};
