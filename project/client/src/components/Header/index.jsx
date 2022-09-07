import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UidContext } from "../../utils/Context";
// import "../../styles/components/navbar.scss";

function Header() {
  const uid = useContext(UidContext);

  if (uid) {
    return (
      <nav>
        <Link to="/">Accueil 👋</Link>
        <Link to="/profil">Profil 🔥</Link>
        <Link to="/trending">Déconnexion ❌</Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">Accueil 👋</Link>
        <Link to="/profil">Connexion ✅</Link>
      </nav>
    );
  }
}

export default Header;
