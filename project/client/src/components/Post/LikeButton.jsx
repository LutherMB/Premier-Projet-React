import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosLikePost, axiosUnlikePost } from "../../feature/user.slice";
import { UidContext } from "../../utils/Context";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(axiosLikePost(post._id, uid));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(axiosUnlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/heart.svg" alt="like" onClick={like} />
      )}
      {uid && liked && (
        <img src="./img/heart-filled.svg" alt="unlike" onClick={unlike} />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
