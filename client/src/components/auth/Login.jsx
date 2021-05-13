import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  //Change handler, sets the value upon user's typing in the form
  //e.g ...formData, name: 'John Doe'
  const setValues = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/dashboard"></Redirect>
  }
  
  return (
    <Fragment>
      <h1 className="x-large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Sign in into your account
      </p>
      <form
        onSubmit={(e) => onSubmit(e)}
        action="dashboard.html"
        className="form"
      >
        <div className="form-group">
          <input
            onChange={(e) => setValues(e)}
            value={email}
            name="email"
            type="email"
            placeholder="Email Adress"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setValues(e)}
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength="6"
            maxLength="20"
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary">
          Sign up
        </Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login);
