import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../redux/actions/post";
import {Link} from "react-router-dom"

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div class="post bg-white my-1">
      <div>
        <Link to={`/profile/${auth.user._id}`}>
          <img class="round-img" src={avatar} alt="avatar" />
          <h4 class="text-primary">{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p>Posted on {<Moment format="YYYY/MM/DD"></Moment>}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            className="btn btn-danger"
            onClick={(e) => deleteComment(postId, _id)}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
