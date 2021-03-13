import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const {email, password } = formData;
    //Change handler, sets the value upon user's typing in the form
    //e.g ...formData, name: 'John Doe'
    const setValues = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async (e)=>{
      e.preventDefault();
      if(password){
          console.log("Passwords don't match")
      }else{
          console.log("succ")
      }
  }

    return (
      <Fragment>
        <h1 className="x-large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i>Sign in into your account
        </p>
        <form onSubmit={onSubmit}  action="dashboard.html" className="form">
          <div className="form-group">
            <input
              onChange={(e) => setValues(e)}
              value={email}
              name='email'
              type="email"
              placeholder="Email Adress"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={password}
              onChange={(e) => setValues(e)}
              name='password'
              type="password"
              placeholder="Password"
              required
              minLength="6"
              maxLength="20"
            />
          </div>
          <input  className="btn btn-primary" type="submit" value="Register" />
        </form>
        <p className="my-1">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary" >
            Sign up
          </Link>
        </p>
      </Fragment>
    );
  };
  

export default Login
