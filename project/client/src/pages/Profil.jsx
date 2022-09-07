import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import UploadImg from "../components/Profil/UploadImg";

const Profil = () => {
  const userData = useSelector((state) => state.users.user);

  return (
    <Fragment>
      <LeftNav />
      <div className="profil-page">
        <div className="profil-container">
          <h1>Profil de {userData ? userData.pseudo : "..."}</h1>
          <div className="update-container">
            <div className="left-part">
              <h3>Photo de profil</h3>
              <img src={userData ? userData.picture : ""} alt="user-pic" />
              <UploadImg />
              {/* <p>{errors.maxSize}</p> */}
              {/* <p>{errors.format}</p> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profil;
