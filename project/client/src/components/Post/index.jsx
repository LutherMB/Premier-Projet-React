import React, { useEffect, useState, Fragment } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "../../utils/Date";
import { isEmpty } from "../../utils/IsEmpty";
import FollowHandler from "../Profil/FollowHandler";
import Youtube from "react-youtube";
import LikeButton from "./LikeButton";
import { axiosUpdatePost } from "../../feature/user.slice";
import DeletePost from "./DeletePost";
import Comments from "./Comments";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(axiosUpdatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <ReactLoading type="spinningBubbles" color="#000" />
      ) : (
        <Fragment>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return ""; //
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) return user.pseudo;
                      else return ""; //
                    })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button
                    className="btn"
                    onClick={() => setIsUpdated(!isUpdated)}
                  >
                    Annuler
                  </button>
                  <button className="btn" onClick={updateItem}>
                    Valider modifications
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <Youtube
                videoId={post.video.split("https://youtu.be/")[1]}
                iframeClassName="card-vid"
              />
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/edit.svg" alt="edit" />
                </div>
                <DeletePost id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  src="./img/message1.svg"
                  alt="comment"
                  onClick={() => setShowComments(!showComments)}
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/share.svg" alt="share" />
            </div>
            {showComments && <Comments post={post} />}
          </div>
        </Fragment>
      )}
    </li>
  );
};

export default Card;
