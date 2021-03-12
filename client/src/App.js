//React
import React, { Fragment } from "react";
//Components
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
//Packages
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Styles
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Navbar></Navbar>
      <Route exact path="/" component={Landing}></Route>
      <section className="container">
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
