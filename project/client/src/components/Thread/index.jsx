import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosGetPosts } from "../../feature/user.slice";
import { isEmpty } from "../../utils/IsEmpty";
import Card from "../Post";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.users.post);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(axiosGetPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, count, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
        {isEmpty(posts) && <h1>Chargement des posts en cours..</h1>}
      </ul>
    </div>
  );
};

export default Thread;
