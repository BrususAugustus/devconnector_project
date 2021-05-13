import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeEducation } from "../../redux/actions/profile";


const Education = ({ education,removeEducation  }) => {
  const educations = education.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.school}</td>
      <td>{exp.degree}</td>
      <td className="hide-sm"> 
        <Moment format="DD/MM/YYYY">
          {exp.from}
        </Moment>{" "}
        {exp.to ? <Moment format="DD/MM/YYYY">{exp.to}</Moment> : " - "}
      </td>
      <td>
        <button onClick={()=>removeEducation(exp._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2>Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array,
  removeEducation: PropTypes.func
};

export default connect(null, {removeEducation})(Education);
