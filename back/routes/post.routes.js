const router = require("express").Router();
// const auth = require("../middlewares/auth");

const postController = require("../controllers/post.controller");

router.post("/", postController.createPost);
router.get("/", postController.readPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment/:id", postController.editComment);
router.patch("/delete-comment/:id", postController.deleteComment);

module.exports = router;
