import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/postAction";
const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showAction
}) => {
  return (
    <div>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={"/profile/" + user}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showAction && (
            <Fragment>
              <button
                onClick={e => addLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-up" /> <span>{likes.length}</span>
              </button>
              <button
                onClick={e => removeLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down"> </i>
              </button>
              <Link to={"/posts/" + _id} className="btn btn-primary">
                Discussion{" "}
                <span className="comment-count">{comments.length}</span>
              </Link>
              {!auth.loading &&
                user === auth.user._id && (
                  <button
                    onClick={e => deletePost(_id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times" />
                  </button>
                )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showAction: true
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
