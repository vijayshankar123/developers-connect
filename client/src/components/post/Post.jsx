import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/postAction";
const Post = ({ getPost, post: { post, loading }, match, showAction }) => {
  useEffect(
    () => {
      getPost(match.params.id);
    },
    [getPost]
  );
  return (
    <div>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <div>
          <Link to={"/posts"}>
            <button className="btn btn-primary">go back</button>
          </Link>
          <PostItem post={post} showAction={false} />
          <CommentForm postid={post._id} />
          <div className="comments">
            {post.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postid={post._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getPost })(Post);
