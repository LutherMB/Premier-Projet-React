import React from "react";
import axios from "axios";

const Trending = () => {
  const handleLogout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        window.location = `${process.env.REACT_APP_FRONT_URL}/`;
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };

  return (
    <div className="profil-page">
      <h1>Page de déconnexion ❌</h1>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default Trending;
