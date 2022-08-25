const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema( // Je crée le Schema d'user
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true, // Supprime les espaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6,
    },
    bio: {
      type: String,
      max: 1024,
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

const userModel = mongoose.model('user', userSchema); // Je récupère le schema, que j'utiliserai en tant que modèle pour la table "user" de ma bdd

module.exports = userModel