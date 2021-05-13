import React from "react";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import PrivateRoute from "../routing/PrivateRoute.jsx";
import CreateProfile from "../profile-form/CreateProfile.jsx";
import EditProfile from "../profile-form/EditProfile.jsx";
import AddEperience from "../profile-form/AddExperience";
import AddEducation from "../profile-form/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import { Route, Switch } from "react-router-dom";

import Post from "../posts/Post";
import NotFound from "../layout/NotFound.jsx";
const Routes = (props) => {
  return (
    <section className="container">
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
        <Route exact path="/profile/:id" component={Profile}></Route>
        <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
        <PrivateRoute exact path="/posts/:id" component={Post}></PrivateRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </section>
  );
};

export default Routes;
