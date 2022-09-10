import React from "react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosFollow, axiosUnfollow } from "../../feature/user.slice";
import { isEmpty } from "../../utils/IsEmpty";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.users.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(axiosFollow(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(axiosUnfollow(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <Fragment>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === "card" && <img src="./img/checked.svg" alt="checked" />}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="follow-btn">Suivre</button>
          )}
          {type === "card" && <img src="./img/check.svg" alt="checked" />}
        </span>
      )}
    </Fragment>
  );
};

export default FollowHandler;
