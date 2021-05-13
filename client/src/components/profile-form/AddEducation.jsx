import React, { useState, Fragment } from "react";
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../redux/actions/profile";


const AddEducation = ({history, addEducation}) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "", 
    current: false,
    description: "",
  });
  const { school, degree, from, to, current, fieldofstudy, description } = formData;
  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className="large text-primary">Add your education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school, course or bootcamp you've attended.
      </p>
      <small>* = required field</small>
      <form onSubmit={e=>{
          e.preventDefault();
          addEducation(formData, history);
      } } className="form">
        <div className="form-group">
          <input
            value={degree}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Degree"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={school}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* School"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Field of study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            value={from}
            onChange={(e) => onChange(e)}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            value={to}
            disabled={current ? "disabled" : ""}
            onChange={(e) => onChange(e)}
            type="date"
            name="to"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              checked={current}
              type="checkbox"
              name="current"
            />{" "}
            Ongoing
          </p>
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => onChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to={"/dashboard"}>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};
AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation);
