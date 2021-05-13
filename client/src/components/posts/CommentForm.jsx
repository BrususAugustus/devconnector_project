import React, { useState } from "react";
import PropTypes from "prop-types";
import { addComment } from "../../redux/actions/post";
import { connect } from "react-redux";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="post-form-header bg-primary p-1">
        <h3>Share your thoughts</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
        className="form my-1"
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Hello World!"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        >
          {" "}
        </textarea>
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {};

export default connect(null, { addComment })(CommentForm);
