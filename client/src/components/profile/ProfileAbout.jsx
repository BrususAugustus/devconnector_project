import React, { Fragment } from "react";

const ProfileAbout = ({
  profile: {
    bio,
    experience,
    education,
    skills,
    user: { name },
  },
}) => {
  const [firstName, lastName] = name.trim().split(" ");
  return (
    <Fragment>
      <div className="profile-about bg-light p-2">
        {bio && (
          <Fragment>
            <h2 className="text-primary large">
              {name[-1] !== "s" ? `${firstName}'s bio` : `${firstName}' bio`}
            </h2>
            <p className="big">{bio}</p>
          </Fragment>
        )}

        <div className="line"></div>
        <h2 className="text-primary large">
          <i className="fas fa-laptop-code"></i> Skill Set
        </h2>
        <div
          className="skills
        "
        >
          {skills &&
            skills.map((skill, index) => (
              <div key={index} className="p-1">
                <i className="fas fa-check"></i> {skill}
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileAbout;
