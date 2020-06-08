import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Header } from "./components/Header";
import SetBudget from "./components/SetBudget";
import { BudgetRemainingSpent } from "./components/BudgetRemainingSpent";
import AddTransaction from "./components/AddTransaction";
import { TransactionList } from "./components/TransactionList";
import { Settings } from "./components/Settings";
import SetCurrency from "./components/SetCurrency";
import { Footer } from "./components/Footer";

import { GlobalProvider } from "./context/GlobalState";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <Router basename={"/travel-budget"}>
        <Container fluid className="bg-light min-vh-100">
          <Header />
          <Route path="/set-budget" exact component={SetBudget} />
          <Route path="/" exact component={BudgetRemainingSpent} />
          <Route path="/add-transaction" exact component={AddTransaction} />
          <Route path="/" exact component={TransactionList} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/set-currency" exact component={SetCurrency} />
          <Route path="/" exact component={Footer} />
        </Container>
      </Router>
    </GlobalProvider>
  );
}

export default App;
