import React from "react";
import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <>
      <Row className="mb-4 pt-5 pb-2 pl-3 pr-3 bg-blue fixed-top">
        <Col>
          <h2 className="font-weight-bold title-text d-inline">
            <img
              src={process.env.PUBLIC_URL + "/travel-budget-logo.svg"}
              alt="Travel Budget web app logo"
              className="nav-brand"
            ></img>
          </h2>
        </Col>
        <Col className="text-right">
          <Link to="/settings">
            <FontAwesomeIcon
              className="fa-lg text-white mt-1"
              icon={faSlidersH}
            />
          </Link>
        </Col>
      </Row>
    </>
  );
};
