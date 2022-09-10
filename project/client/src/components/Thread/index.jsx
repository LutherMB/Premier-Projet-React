import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosGetPosts } from "../../feature/user.slice";
import { isEmpty } from "../../utils/IsEmpty";
import Card from "../Post";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.users.post);

  useEffect(() => {
    if (loadPost) {
      dispatch(axiosGetPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
        {isEmpty(posts) && <h1>Oups! Chargement des posts impossible..</h1>}
      </ul>
    </div>
  );
};

export default Thread;
