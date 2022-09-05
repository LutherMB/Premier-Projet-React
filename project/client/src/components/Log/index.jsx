import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

function Log() {
  // J'utilise le hook useState pour créer le state "signUpModal" et la fonction qui permettra de le mettre à jour "setSignUpModal"
  const [signUpModal, setSignUpModal] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setSignUpModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="signup"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={loginModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {/* Si le state signUpModal est true, affiche le component SignUpForm */}
        {loginModal && <LoginForm />}
      </div>
    </div>
  );
}

export default Log;
