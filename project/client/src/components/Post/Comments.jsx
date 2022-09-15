import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAddComment, axiosGetPosts } from "../../feature/user.slice";
import { isEmpty } from "../../utils/IsEmpty";
import { timestampDateParser } from "../../utils/Timestamp";
import FollowHandler from "../Profil/FollowHandler";
import EditComment from "./EditComment";

function Comments({ post }) {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(axiosAddComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(axiosGetPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampDateParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              {(userData.isAdmin === true || comment.commenterId === userData._id) && (
                <EditComment comment={comment} postId={post._id} />
              )}
            </div>
          </div>
        );
      })}
      <form action="" onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Laisser un commentaire"
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

export default Comments;
