import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };
  return (
    <Fragment>
      <div className="profile-top bg-primary p-2">
        <img className="round-img my-2" src={avatar} alt="avatar" />
        <div>
          <h2 className="large">{name}</h2>
          <p className="lead">
            {status && company
              ? `${status} at ${company}`
              : status
              ? status
              : ""}
          </p>
          <p className="lead">{location && location}</p>

          <div className="icons my-1">
            {website && (
              <a href={website}>
                <i className="fas fa-globe fa-2x mx-1"></i>
              </a>
            )}
            {social && isValidUrl(social.facebook) && (
              <a href={social.facebook  }>
                <i className="fab fa-facebook fa-2x mx-1"></i>
              </a>
            )}
            {social && isValidUrl(social.twitter) && (
              <a href={social.twitter}>
                <i className="fab fa-twitter fa-2x mx-1"></i>
              </a>
            )}
            {social && isValidUrl(social.linkedin) && (
              <a href={social.linkedin}>
                <i className="fab fa-linkedin fa-2x mx-1"></i>
              </a>
            )}
            {social && isValidUrl(social.instagram) && (
              <a href={social.instagram}>
                <i className="fab fa-instagram fa-2x mx-1"></i>
              </a>
            )}
          </div>
        </div>
      </div>

    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object,
};

export default ProfileTop;
