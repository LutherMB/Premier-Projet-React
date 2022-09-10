import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPicture } from "../../feature/user.slice";

const UploadImg = () => {
  const [file, setFile] = useState();
  // const [updt, setUpdt] = useState({});
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.user);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(axiosPicture(data, userData._id));
    // setUpdt({ ...updt });
    // window.location.reload();
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-ipc">
      <label htmlFor="file">Changer de photo</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Valider" />
    </form>
  );
};

export default UploadImg;
