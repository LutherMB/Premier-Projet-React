const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  // Je crée le Schema d'user
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
      unique: true,
      trim: true, // Supprime les espaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      maxLength: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String], // Comprendra l'ID de chaque post liké
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

// Hash le mdp avant de .save dans la BDD
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const userModel = mongoose.model("user", userSchema); // Je récupère le schema, que j'utiliserai en tant que modèle pour la table "user" de ma bdd
module.exports = userModel;
