const express = require("express");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    `http://localhost:${process.env.FRONT_PORT}`
  ); // Accès API depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Ajout des headers aux requêtes envoyées vers l'API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Différentes méthodes d'envoi de requête
  res.setHeader("Access-Control-Allow-Credentials", true); // Obligatoire pour les requêtes sur ports différents
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
