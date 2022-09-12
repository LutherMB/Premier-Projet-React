import React from "react";
import { useDispatch } from "react-redux";
import { axiosDeletePost } from "../../feature/user.slice";

function DeletePost(props) {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(axiosDeletePost(props.id));

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
