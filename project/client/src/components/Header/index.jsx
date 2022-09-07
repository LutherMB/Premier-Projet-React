import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UidContext } from "../../utils/Context";
import Logout from "../Log/Logout";
import { useSelector } from "react-redux";

function Header() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.users.user);
  // let userPseudo = useRef(null);
  // console.log(userData.pseudo);

  // useEffect(() => {
  //   // check if user has been fetched (will not be the case on mount)
  //   if (userData) {
  //     userPseudo.current.value = userData.pseudo;
  //     console.log(userPseudo);
  //   }
  // }, [userData]);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <div className="logo">
              <img
                src="./img/icon-left-font-monochrome-black.svg"
                alt="groupomania-logo"
              />
            </div>
          </Link>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li>
              <Link to="/trending">
                Déconnecter {userData ? userData.pseudo : "[Pseudo]"} ❌
              </Link>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <Link to="/profil">
                <img src="./img/login.svg" alt="login" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;
