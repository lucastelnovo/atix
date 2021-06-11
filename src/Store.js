import React, { createContext, useReducer } from "react";

const initialState = {
  alarms: [],
  filteredAlarms: [],
};

const Store = createContext(initialState);
const { Provider } = Store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState;
    console.log("[DISPATCH]: ", action);
    switch (action.type) {
      case "SET_ALARMS":
        newState = {
          ...state,
          alarms: action.payload,
          filteredAlarms: action.payload,
        };
        return newState;
      case "SET_FILTERED_ALARMS":
        let filtered;
        const status = action.payload.status;
        if (action.payload.name) {
          const name = action.payload.name.toLowerCase();
          filtered = state.alarms.filter(
            (a) => a.name.toLowerCase().includes(name) && a.paused === !status
          );
        } else {
          filtered = state.alarms.filter((a) => a.paused === !status);
        }

        newState = {
          ...state,
          filteredAlarms: filtered,
        };
        return newState;
      default:
        throw new Error("invalid dispatch");
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Store, StateProvider };
