import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../redux/actions/post";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm"
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
      {loading || posts== null ? (
        <Spinner />
      ) : (
        <>
          <section class="container">
          <PostForm />
            <h1 class="large text-primary">Posts</h1>
            <p class="big">
              <i class="fas fa-user"></i>Welcome
            </p>

            <div class="posts">
              {posts.map((post) => (
                <PostItem showActions={true} key={post._id} post={post} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
