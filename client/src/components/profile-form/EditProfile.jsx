import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setProfileData } from "../../redux/actions/profile";
import { Link, withRouter } from "react-router-dom";
import { getCurrentProfile } from "../../redux/actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  setProfileData,
  history,
  getCurrentProfile,
}) => {
  //Pull profile data and populate the form with it
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading]);

  //Form Object
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  });

  //Social Networks Toggle | Hidden by default
  const [displaySocialNetworks, toggleSocialNetworks] = useState(false);
  //Destructure
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    setProfileData(formData, history, true);
  };
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <Link className="btn btn-light my-1" to="/dashboard">
        Go Back
      </Link>
      <br></br>
      <small>* = required fields</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            value={company}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            value={website}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            value={location}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            value={skills}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            value={githubusername}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialNetworks(!displaySocialNetworks)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialNetworks && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={twitter}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={facebook}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={youtube}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={linkedin}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={instagram}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Send" />
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  setProfileData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { setProfileData, getCurrentProfile })(
  withRouter(EditProfile)
);
