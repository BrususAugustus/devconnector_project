import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { getProfileById } from "../../redux/actions/profile";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileEducationElement from "./ProfileEducationElement";
import ProfileExperienceElement from "./ProfileExperienceElement.jsx";
import ProfileGithubElement from "./ProfileGithubElement";

const Profile = ({
  getProfileById,
  match,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-primary my-1">
            &larr; Go Back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Your Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-edu bg-light p-2">
              <h2 className="text-primary large">
                <i className="fas fa-user-graduate"></i> Education
              </h2>
              {profile.education.length > 0
                ? profile.education.map((edu, index) => (
                    <ProfileEducationElement key={index} education={edu} />
                  ))
                : "No education credentials."}
            </div>
            <div className="profile-exp bg-light p-2">
              <h2 className="text-primary large">
                <i className="fas fa-briefcase"></i> Experiences
              </h2>
              {profile.experience.length > 0
                ? profile.experience.map((exp, index) => (
                    <ProfileExperienceElement key={index} experience={exp} />
                  ))
                : "No experience credentials."}
            </div>
            {profile.githubusername && (
              <ProfileGithubElement username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
