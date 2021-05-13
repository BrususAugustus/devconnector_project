import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i>
        Page not found...
      </h1>
      <p className="large">You can always go back</p>
      <Link to="/dashboard" className="btn btn-primary">
        &larr;
      </Link>
    </>
  );
};

export default NotFound;
