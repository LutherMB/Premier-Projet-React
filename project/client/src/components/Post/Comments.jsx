import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/IsEmpty";
import { timestampDateParser } from "../../utils/Timestamp";
import FollowHandler from "../Profil/FollowHandler";

function Comments({ post }) {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.users.user);
  const dispatch = useDispatch;

  const handleComment = () => {};

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
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
