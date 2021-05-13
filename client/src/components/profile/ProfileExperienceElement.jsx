import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
const ProfileExperienceElement = ({
  experience: { current, company, description, title,  location, from, to },
}) => {
  return (
    <Fragment>
      <h3>{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Location: </strong>
        {location}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>{description && <strong>{description}</strong>}</p>
    </Fragment>
  );
};

ProfileExperienceElement.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperienceElement;
