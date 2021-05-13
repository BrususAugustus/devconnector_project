import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
    //Returns a route with all components, but chceck whether user is authenticated
    //If not, it redirects him to login screen
    //If he's authenticated, it render the component with the rest of the props
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login"></Redirect>
      ) : (
        <Component {...props}></Component>
      )
    }
  ></Route>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
