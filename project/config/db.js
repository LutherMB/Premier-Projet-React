const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB, // Connection à la base de données
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));
