import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [],
  budgets: [],
  currencys: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  function deleteTransactions(transactions) {
    dispatch({
      type: "DELETE_TRANSACTIONS",
      payload: transactions,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  function clearCurrency(currencys) {
    dispatch({
      type: "CLEAR_CURRENCY",
      payload: currencys,
    });
  }

  function addCurrency(currency) {
    dispatch({
      type: "ADD_CURRENCY",
      payload: currency,
    });
  }

  function clearBudget(budgets) {
    dispatch({
      type: "CLEAR_BUDGET",
      payload: budgets,
    });
  }

  function addBudget(budget) {
    dispatch({
      type: "ADD_BUDGET",
      payload: budget,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        deleteTransactions,
        addTransaction,

        budgets: state.budgets,
        clearBudget,
        addBudget,

        currencys: state.currencys,
        clearCurrency,
        addCurrency,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
