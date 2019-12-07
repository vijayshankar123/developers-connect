import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postAction";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Spinner from "../layout/Spinner";
const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(
    () => {
      getPosts();
    },
    [getPosts]
  );

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"> </i> Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {posts.map(post => <PostItem key={post._id} post={post} />)}
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
