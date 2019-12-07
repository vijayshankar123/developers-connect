import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/postAction";
const CommentForm = ({ addComment, postid }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <div>
        <div className="post-form">
          <div className="bg-primary p">
            <h3>Leave a comment</h3>
          </div>
          <form
            className="form my-1"
            onSubmit={e => {
              e.preventDefault();
              addComment(postid, { text });
              setText(" ");
            }}
          >
            <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Add a comment"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { addComment })(CommentForm);
