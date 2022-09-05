import { Link } from "react-router-dom";
// import "../../styles/components/navbar.scss";

function Header() {
  return (
    <nav>
      <Link to="/">Accueil 👋</Link>
      <Link to="/profil">Profil 🔥</Link>
      <Link to="/trending">Trending 👌</Link>
    </nav>
  );
}

export default Header;
