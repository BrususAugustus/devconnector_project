import React, { Fragment, useState } from "react";

const Register = () => {
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

const onSubmit = (e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
        console.log("Passwords don't match")
    }
    else{
        console.log(formData)
    }

}

  return (
    <Fragment>
      <h1 className="x-large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Create Your Account
      </p>
      <form onSubmit={onSubmit}  action="dashboard.html" className="form">
        <div className="form-group">
          <input
            onChange={(e) => setValues(e)}
            value={name}
            name='name'
            type="text"
            placeholder="Name"
            required
            maxLength="20"
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => setValues(e)}
            value={email}
            name='email'
            type="email"
            placeholder="Email Adress"
            required
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
            name='password'
            type="password"
            placeholder="Password"
            required
            minLength="6"
            maxLength="20"
          />
        </div>
        <div className="form-group">
          <input
            value={confirmPassword}
            onChange={(e) => setValues(e)}
            name='confirmPassword'
            type="password"
            placeholder="Confirm Password"
            required
            minLength="6"
            maxLength="20"
          />
        </div>
        <input  className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p className="my-1">
        Already have an account?{" "}
        <a className="text-primary" href="login.html">
          Sign in
        </a>
      </p>
    </Fragment>
  );
};

export default Register;
