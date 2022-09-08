const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    req.auth = {
      // J'envoie les données que je veux dans un nouveau champ "auth" de la request (puisqu'elle sera transmise aux nexts middlewares)
      userId: userId,
    };

    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      console.log(`${userId} : utilisateur authentifié !`);
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "Authentification échouée" });
  }
};
