import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { dateParser } from "../../utils/Date";
import { isEmpty } from "../../utils/IsEmpty";
import FollowHandler from "../Profil/FollowHandler";
import Youtube from "react-youtube";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.users.user);

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
                    })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            <p>{post.message}</p>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <Youtube
                videoId={post.video.split("https://youtu.be/")[1]}
                iframeClassName="card-vid"
              />
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/message1.svg" alt="comment" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/share.svg" alt="share" />
            </div>
          </div>
        </Fragment>
      )}
    </li>
  );
};

export default Card;
