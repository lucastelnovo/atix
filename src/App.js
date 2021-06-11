import React, { useEffect, useContext } from "react";
import API from "./Api";
import { Store } from "./Store";
import "./App.css";
import FixedTopBar from "./components/FixedTopBar";
import SideNav from "./components/SideMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardView from "./views/Dashboard.view";
import AlarmsView from "./views/Alarms.view";
import EditView from "./views/Edit.view";

function App() {
  const AppState = useContext(Store);
  const { dispatch, state } = AppState;

  useEffect(() => {
    async function getAlarms() {
      let response = [];
      try {
        response = await API.getAlarms();
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "SET_ALARMS", payload: response });
      }
    }
    getAlarms();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <FixedTopBar />
        <SideNav />
        <Switch>
          <Route exact path="/">
            <DashboardView />
          </Route>
          <Route path="/alarms">
            <AlarmsView data={state.alarms} />
          </Route>
          <Route path="/edit/:name">
            <EditView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
