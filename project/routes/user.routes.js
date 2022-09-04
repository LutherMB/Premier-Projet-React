const router = require("express").Router();
const auth = require("../middlewares/auth");
// const multer = require("../middlewares/multer-config");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id",  auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);
router.patch("/follow/:id", auth, userController.follow);
router.patch("/unfollow/:id", auth, userController.unfollow);

module.exports = router;
