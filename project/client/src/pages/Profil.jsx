import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import UploadImg from "../components/Profil/UploadImg";
import { axiosBio } from "../feature/user.slice";
import { dateParser } from "../utils/Date";
import { AiOutlineClose } from "react-icons/ai";
import FollowHandler from "../components/Profil/FollowHandler";
// import { BsFillXSquareFill } from "react-icons/bs";

const Profil = () => {
  const userData = useSelector((state) => state.users.user);
  const usersData = useSelector((state) => state.users.users);
  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(axiosBio(userData._id, bio));
    setUpdateForm(false);
    // window.location.href = "/profil";
  };

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
            <div className="right-part">
              <div className="bio-update">
                <h3>Bio</h3>
                {updateForm === false && (
                  <Fragment>
                    <p onClick={() => setUpdateForm(!updateForm)}>
                      {userData.bio}
                    </p>
                    <button onClick={() => setUpdateForm(!updateForm)}>
                      Modifier bio
                    </button>
                  </Fragment>
                )}
                {updateForm && (
                  <Fragment>
                    <textarea
                      type="text"
                      defaultValue={userData.bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <button onClick={handleUpdate}>
                      Valider modifications
                    </button>
                  </Fragment>
                )}
              </div>
              <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
              <h5 onClick={() => setFollowingPopup(true)}>
                Abonnements : {userData.following.length}
              </h5>
              <h5 onClick={() => setFollowersPopup(true)}>
                Abonnés : {userData.followers.length}
              </h5>
            </div>
          </div>
          {followingPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Abonnements</h3>
                <span
                  className="cross"
                  onClick={() => setFollowingPopup(false)}
                >
                  {" "}
                  <AiOutlineClose />{" "}
                </span>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.following.length; i++) {
                      if (user._id === userData.following[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="user-pic" />
                            <h4>{user.pseudo}</h4>
                            <div className="follow-handler">
                              <FollowHandler
                                idToFollow={user._id}
                                type={"suggestion"}
                              />
                            </div>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          )}
          {followersPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Abonnés</h3>
                <span
                  className="cross"
                  onClick={() => setFollowersPopup(false)}
                >
                  {" "}
                  <AiOutlineClose />{" "}
                </span>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.followers.length; i++) {
                      if (user._id === userData.followers[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="user-pic" />
                            <h4>{user.pseudo}</h4>
                            <div className="follow-handler">
                              <FollowHandler
                                idToFollow={user._id}
                                type={"suggestion"}
                              />
                            </div>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Profil;
