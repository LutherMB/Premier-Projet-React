import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosDeletePost } from "../../feature/user.slice";

function DeletePost(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.user);
  const deleteQuote = () => dispatch(axiosDeletePost(props.id, userData._id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/trash.svg" alt="trash" />
    </div>
  );
}

export default DeletePost;
