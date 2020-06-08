export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    case "DELETE_TRANSACTIONS":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id === action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "ADD_CURRENCY":
      return {
        ...state,
        currencys: [action.payload, ...state.currencys],
      };

    case "CLEAR_CURRENCY":
      return {
        ...state,
        currencys: state.currencys.filter(
          (currency) => currency.id === action.payload
        ),
      };

    case "CLEAR_BUDGET":
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id === action.payload),
      };
    case "ADD_BUDGET":
      return {
        ...state,
        budgets: [action.payload, ...state.budgets],
      };

    default:
      return state;
  }
};
