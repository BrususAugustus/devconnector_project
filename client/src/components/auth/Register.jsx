import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import { register } from "../../redux/actions/auth";
import PropTypes from "prop-types";


const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;
  //Change handler, sets the value upon user's typing in the form
  //e.g ...formData, name: 'John Doe'
  const setValues = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords don't match", "danger");
    } else {
      register({ name, email, password });
    }
  };

    //Redirect if logged in
    if(isAuthenticated){
      return <Redirect to="/dashboard"></Redirect>
    }

  return (
    <Fragment>
      <h1 className="x-large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Create Your Account
      </p>
      <form onSubmit={onSubmit} action="dashboard.html" className="form">
        <div className="form-group">
          <input
            onChange={(e) => setValues(e)}
            value={name}
            name="name"
            type="text"
            placeholder="Name"
            maxLength="20"
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => setValues(e)}
            value={email}
            name="email"
            type="email"
            placeholder="Email Adress"
          />
          <small className="form-text">
            This site uses gravatar. If you want to use your gravatar, use a
            Gravatar email.
          </small>
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setValues(e)}
            name="password"
            type="password"
            placeholder="Password"
            maxLength="20"
          />
        </div>
        <small className="form-text">
          Password has to be 8 characters long or more.
        </small>
        <div className="form-group">
          <input
            value={confirmPassword}
            onChange={(e) => setValues(e)}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            maxLength="20"
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p className="my-1">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">
          Sign in
        </Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { setAlert, register })(Register);
