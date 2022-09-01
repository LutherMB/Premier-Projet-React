const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { signUpErrors } = require("../utils/errors.utils");
require("dotenv").config({ path: "./config/.env" });

exports.signUp = async (req, res) => {
  console.log(req.body);
  const { pseudo, email, password, bio } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password, bio });
    res.status(201).json({ user: user._id });
    console.log("Inscription OK !");
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
    console.log("Inscription impossible...");
  }
};

exports.login = (req, res) => {
  UserModel
    .findOne({ email: req.body.email }) // Renverra null s'il ne trouve rien
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Utilisateur non trouvé !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password) // Renvoie un boolean
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Mot de passe incorrect !" });
            } else {
              res.status(200).json({
                // Envoi des données nécessaires à l'authentification de l'user (à savoir l'userID et le token)
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  process.env.TOKEN_SECRET,
                  { expiresIn: "24h" }
                ),
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

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
