const express = require("express");

const userRoutes = require("./routes/user.routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Accès API depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Ajout des headers aux requêtes envoyées vers l'API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Différentes méthodes d'envoi de requête
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

module.exports = app;
