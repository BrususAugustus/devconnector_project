//React
import React, { Fragment, useEffect } from "react";
//Components
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert.jsx";
import Routes from "./components/routing/Routes";

//Packages
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Styles
import "./App.css";
//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import setAuthToken from "./redux/actions/utils/setAuthToken";
import { loadUser } from "./redux/actions/auth";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./components/layout/Spinner";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={Spinner} persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar></Navbar>

            <Alert />
            <Switch>
              <Route exact path="/" component={Landing}></Route>
              <Route component={Routes}></Route>

            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
