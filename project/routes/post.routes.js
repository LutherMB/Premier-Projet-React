const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const postController = require("../controllers/post.controller");

router.post("/", auth, multer, postController.createPost);
router.get("/", auth, postController.readPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);
router.patch("/like-post/:id", auth, postController.likePost);
router.patch("/unlike-post/:id", auth, postController.unlikePost);

router.patch("/comment-post/:id", auth, postController.commentPost);
router.patch("/edit-comment/:id", auth, postController.editComment);
router.patch("/delete-comment/:id", auth, postController.deleteComment);

module.exports = router;
