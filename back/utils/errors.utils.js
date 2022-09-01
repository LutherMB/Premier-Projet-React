exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" }; // kind = unique/minlegth/..

  if (err.message.includes("pseudo")) {
    if (err.errors.pseudo.kind === "unique") {
      errors.pseudo = `Ce pseudo est déjà pris : ${err.errors.pseudo.value}`;
    } else {
      errors.pseudo = `Pseudo incorrect (doit comprendre entre 3 à 40 caractères)`;
    }
  }

  if (err.message.includes("email")) {
    if (err.errors.email.kind === "unique") {
      errors.email = `Un compte utilisant ce mail existe déjà`;
    } else {
      errors.email = `Mail incorrect`;
    }
  }

  if (err.message.includes("password")) {
    errors.password =
      "Mot de passe incorrect (doit comprendre entre 6 à 100 caractères)";
  }

  return errors;
};

// exports.loginErrors = (err) => {
//   let errors = { email: "", password: "" };

//   if (err.message.includes("email"))
//     errors.email = "Aucun compte n'est lié à ce mail";

//   if (err.message.includes("password"))
//     errors.password = "Le mot de passe est incorrect";

//   return errors;
// };
