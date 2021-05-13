//React
import React, { Fragment, useEffect } from "react";
//Components
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import PrivateRoute from "./components/routing/PrivateRoute.jsx";
import CreateProfile from "./components/profile-form/CreateProfile.jsx";
import EditProfile from "./components/profile-form/EditProfile.jsx";
import AddEperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Spinner from "./components/layout/Spinner";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post"

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
            <Route exact path="/" component={Landing}></Route>
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/profiles" component={Profiles}></Route>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddEperience}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                ></PrivateRoute>
                <Route exact path="/profile/:id" component={Profile}>

                </Route>
                <PrivateRoute
                  exact
                  path="/posts"
                  component={Posts}
                ></PrivateRoute>
                <PrivateRoute exact path="/posts/:id" component={Post}></PrivateRoute>
              </Switch>
            </section>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
