import React from "react";
import axios from "axios";

const Logout = () => {
  const handleLogout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        window.location = `${process.env.REACT_APP_FRONT_URL}/profil`;
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };

  return (
    <li onClick={handleLogout}>
      <img src="./img/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
