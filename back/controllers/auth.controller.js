const userModel = require("../models/user.model");
const User = require("../models/user.model");

exports.signUp = async (req, res) => {
  console.log("req.body :");
  console.log(req.body);
  const { pseudo, email, password } = req.body;

  try {
    const user = await userModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
    console.log("Inscription OK !");
  } catch (err) {
    res.status(400).send({ err });
    console.log("Inscription impossible...");
  }
};

exports.login = async (req, res) => {
  return;
};

exports.logout = async (req, res) => {
  return;
};
