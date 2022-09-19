const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.createPost = async (req, res) => {
  try {
    const newPost = new PostModel({
      posterId: req.body.posterId,
      message: req.body.message,
      video: req.body.video,
    });

    if (req.file) {
      newPost.picture = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID invalide : " + req.params.id);

  PostModel.findOne({ _id: req.params.id }).then((post) => {
    UserModel.findOne({ _id: req.body.userId }).then((user) => {
      if (post.posterId == req.body.userId || (user && user.isAdmin === true)) {
        if (user.isAdmin === true) console.log("Admin OK");
        else console.log("PosterID OK");

        const updatedRecord = {
          message: req.body.message,
        };

        PostModel.updateOne(
          { _id: req.params.id },
          {
            $set: updatedRecord,
          }
        )
          .then(() => res.status(200).json({ message: "Post updated !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    });
  });
};

exports.deletePost = (req, res) => {
  console.log(req.params.id);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID invalide : " + req.params.id);

  PostModel.findOne({ _id: req.params.id }).then((post) => {
    UserModel.findOne({ _id: req.body.userId }).then((user) => {
      if (post.posterId == req.body.userId || (user && user.isAdmin === true)) {
        if (user.isAdmin === true) console.log("Admin OK");
        else console.log("PosterID OK");

        PostModel.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Post supprimé" });
          })
          .catch((err) => {
            res.status(401).json({ err });
          });
      }
    });
  });
};

exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID invalide : ${req.params.id}`);

  try {
    // J'ajoute mon ID à la liste de likers de ce post
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true, upsert: true }
    );
    // J'ajoute ce post à ma liste de likes
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: `Le post ${req.params.id} a bien été like par ${req.body.id}`,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID invalide : ${req.params.id}`);

  try {
    // J'enlève mon ID de la liste de likers de ce post
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true, upsert: true }
    );
    // J'enlève ce post de ma liste de likes
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: `Le post ${req.params.id} a bien été unlike par ${req.body.id}`,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID invalide : ${req.params.id}`);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true, upsert: true }
    );
    return res.status(200).json({
      message: `Le post ${req.params.id} a été commenté par ${req.body.commenterId}`,
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

exports.editComment = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID invalide : ${req.params.id}`);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Commentaire introuvable");
      theComment.text = req.body.text;
      console.log(theComment);

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(501).send(err);
      });
    });
  } catch (err) {
    return res.status(502).send({ err });
  }
};

exports.deleteComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID invalide : ${req.params.id}`);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: `Le commentaire ${req.params.id} a bien été supprimé`,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
