const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { signUpErrors, loginErrors } = require("../utils/errors.utils");
require("dotenv").config({ path: "./config/.env" });

exports.signUp = async (req, res) => {
  console.log(req.body);
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
    console.log("Inscription OK !");
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
    console.log("Inscription impossible...");
  }
};

exports.login = (req, res) => {
  UserModel.findOne({ email: req.body.email }) // Renverra null s'il ne trouve rien
    .then((user) => {
      if (user === null) {
        res.status(404).json({ message: "Utilisateur non trouvé !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password) // Renvoie un boolean
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Mot de passe incorrect !" });
            } else {
              const token = jwt.sign(
                // Création token sans date limite à appliquer à l'user
                { userId: user._id },
                process.env.TOKEN_SECRET,
                { expiresIn: "24h" }
              );
              res.cookie("jwt", token);
              res.status(200).json({
                // Envoi des données nécessaires à l'authentification de l'user (à savoir l'userID et le token)
                userId: user._id,
                token: token,
              });
            }
          })
          .catch((err) => {
            res.status(502).json({ err });
          });
      }
    })
    .catch((err) => {
      // Erreur d'éxecution de requête (pas une erreur si findOne n'a rien trouvé)
      res.status(501).json({ err });
    });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
  console.log("User déconnecté !");
};

exports.checkUser = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    req.auth = {
      // J'envoie les données que je veux dans un nouveau champ "auth" de la request (puisqu'elle sera transmise aux nexts middlewares)
      userId: userId,
    };

    console.log(`(log) ${userId} : L'utilisateur a bien un token`);

    if (req.body.userId && req.body.userId !== userId) {
      console.log("Invalid user ID");
      throw "Invalid user ID";
    } else {
      console.log("(log) " + userId);
      res.status(200).json({ userId });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
