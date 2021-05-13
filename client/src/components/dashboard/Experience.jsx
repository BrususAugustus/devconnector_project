import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeExperience } from "../../redux/actions/profile";
const Experience = ({ experience, removeExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td className="hide-sm">
        <Moment format="DD/MM/YYYY">{exp.from}</Moment>{" "}
        {exp.to ? <Moment format="DD/MM/YYYY">{exp.to}</Moment> : " - "}
      </td>
      <td>
        <button onClick={()=>removeExperience(exp._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2>Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array,
  removeExperience: PropTypes.func
  
};

export default connect(null, {removeExperience})(Experience);
