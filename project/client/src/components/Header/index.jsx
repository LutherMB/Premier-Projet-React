import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UidContext } from "../../utils/Context";
import Logout from "../Log/Logout";

function Header() {
  const uid = useContext(UidContext);

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
              <Link to="/trending">Déconnecter 'Pseudo' ❌</Link>
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
