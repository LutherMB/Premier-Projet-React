import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosDeleteComment, axiosEditComment } from "../../feature/user.slice";

const EditComment = ({ comment, postId }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(axiosEditComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(axiosDeleteComment(postId, comment._id));

  return (
    <div className="edit-comment">
      {edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/edit.svg" alt="edit" />
        </span>
      )}
      {edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Annuler
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/trash.svg" alt="trash" />
            </span>
            <input type="submit" value="Valider modifications" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditComment;
